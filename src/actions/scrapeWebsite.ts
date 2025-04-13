'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { YoutubeTranscript } from 'youtube-transcript';
import { URL } from 'url';

type ScrapeResult = {
  success: boolean;
  content?: string;
  error?: string;
  url: string;
  timestamp: string;
  isYouTube?: boolean;
};

// Helper functions (isYouTubeUrl, extractYouTubeVideoId) remain unchanged
function isYouTubeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    return (
      hostname === 'youtube.com' ||
      hostname === 'www.youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'youtu.be' ||
      hostname.endsWith('.youtube.com')
    );
  } catch {
    return false;
  }
}

function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1);
    }
    if (parsedUrl.searchParams.has('v')) {
      return parsedUrl.searchParams.get('v');
    }
    if (parsedUrl.pathname.startsWith('/embed/')) {
      return parsedUrl.pathname.split('/')[2];
    }
    if (parsedUrl.pathname.startsWith('/v/')) {
      return parsedUrl.pathname.split('/')[2];
    }
    return null;
  } catch {
    return null;
  }
}

async function scrapeYouTubeInfo(url: string): Promise<ScrapeResult> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    return {
      success: false,
      error: 'Could not extract YouTube video ID from URL',
      url,
      timestamp: new Date().toISOString(),
      isYouTube: true,
    };
  }

  try {
    const options = {
      method: 'GET',
      url: `https://youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com/download-all/${videoId}`,
      params: {
        format_subtitle: 'srt',
        format_answer: 'json',
      },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host':
          'youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    const subtitleSrt = response.data[0]?.subtitle;

    if (!subtitleSrt) {
      return {
        success: false,
        error: 'No subtitle data found in API response',
        url,
        timestamp: new Date().toISOString(),
        isYouTube: true,
      };
    }

    const blocks = subtitleSrt.split('\n\n');

    const transcript = blocks
      .map((block: string) => {
        const lines = block.split('\n');
        return lines.slice(2).join(' ');
      })
      .filter((line: string) => line.trim() !== '')
      .join(' ');

    const content = `YouTube Video ID: ${videoId}\n\nTranscript:\n${transcript}`;

    return {
      success: true,
      content,
      url,
      timestamp: new Date().toISOString(),
      isYouTube: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('YouTube API error:', errorMessage);

    return {
      success: false,
      error: `Failed to fetch transcript from API: ${errorMessage}`,
      url,
      timestamp: new Date().toISOString(),
      isYouTube: true,
    };
  }
}

export async function scrapeWebsite(url: string): Promise<ScrapeResult> {
  try {
    // Validate URL
    new URL(url);

    if (isYouTubeUrl(url)) {
      return await scrapeYouTubeInfo(url);
    }

    // Non-YouTube scraping logic (unchanged for brevity)
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 8000,
      maxContentLength: 10 * 1024 * 1024,
    });

    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('text/html')) {
      return {
        success: false,
        error: `Received non-HTML content: ${contentType}`,
        url,
        timestamp: new Date().toISOString(),
      };
    }

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract content (simplified for brevity)
    const title = $('title').text().trim();
    const content = title ? `Title: ${title}` : 'No content extracted';

    return {
      success: true,
      content,
      url,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Scraping error:', errorMessage);

    return {
      success: false,
      error: errorMessage,
      url,
      timestamp: new Date().toISOString(),
    };
  }
}
