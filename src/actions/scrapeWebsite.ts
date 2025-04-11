'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import { YoutubeTranscript } from 'youtube-transcript';

type ScrapeResult = {
  success: boolean;
  content?: string;
  error?: string;
  url: string;
  timestamp: string;
  isYouTube?: boolean;
};

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
  } catch (e) {
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
  } catch (e) {
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
    const pageData = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    let transcriptData = null;
    try {
      transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
    } catch (transcriptError) {
      console.log(
        `Transcript fetch failed: ${
          transcriptError instanceof Error
            ? transcriptError.message
            : 'Unknown error'
        }`
      );
    }

    const $ = cheerio.load(pageData.data);
    const title = $('title').text().trim();

    const metadata: string[] = [];
    $('meta').each((_, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        metadata.push(`${name}: ${content}`);
      }
    });

    let description = '';
    const descriptionSelectors = [
      '#description-text',
      '#description',
      'meta[name="description"]',
      'meta[property="og:description"]',
    ];

    for (const selector of descriptionSelectors) {
      if (selector.startsWith('meta')) {
        description = $(selector).attr('content') || '';
      } else {
        description = $(selector).text().trim();
      }
      if (description) break;
    }

    let content = `Title: ${title}\n\n`;
    if (description) content += `Description: ${description}\n\n`;
    if (metadata.length > 0) content += `Metadata:\n${metadata.join('\n')}\n\n`;
    content += `YouTube Video ID: ${videoId}\n\n`;

    if (
      transcriptData &&
      Array.isArray(transcriptData) &&
      transcriptData.length > 0
    ) {
      const transcript = transcriptData.map((item) => item.text).join(' ');
      content += `Transcript:\n${transcript}`;
    } else {
      content += `Transcript: Not available for this video`;
    }

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
    console.error(`YouTube scraping error: ${errorMessage}`);

    return {
      success: false,
      error: `Failed to scrape YouTube video: ${errorMessage}`,
      url,
      timestamp: new Date().toISOString(),
      isYouTube: true,
    };
  }
}

function extractAllContent($: cheerio.CheerioAPI): string {
  $(
    'script, style, noscript, iframe, svg, form, header, footer, nav, aside'
  ).remove();

  const title = $('title').text().trim();

  const metadata: string[] = [];
  $('meta').each((_, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    const content = $(el).attr('content');
    if (name && content) {
      metadata.push(`${name}: ${content}`);
    }
  });

  let mainContent = '';
  const contentContainers = [
    'article',
    'main',
    '.content',
    '.article',
    '.post',
    '.entry',
    '#content',
    '#article',
    '#main-content',
    '#post',
  ];

  for (const selector of contentContainers) {
    const container = $(selector).first();
    if (container.length > 0) {
      mainContent = container.text().trim();
      break;
    }
  }

  if (!mainContent) {
    mainContent = $('body').text().trim();
  }

  mainContent = mainContent.replace(/\s+/g, ' ').replace(/\n+/g, '\n').trim();

  let content = '';
  if (title) content += `Title: ${title}\n\n`;
  if (metadata.length > 0) content += `Metadata:\n${metadata.join('\n')}\n\n`;
  if (mainContent) content += `Content:\n${mainContent}`;

  return content;
}

export async function scrapeWebsite(url: string): Promise<ScrapeResult> {
  try {
    try {
      new URL(url);
    } catch (e) {
      return {
        success: false,
        error: 'Invalid URL format',
        url,
        timestamp: new Date().toISOString(),
      };
    }

    if (isYouTubeUrl(url)) {
      return await scrapeYouTubeInfo(url);
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 15000,
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

      const content = extractAllContent($);

      if (!content) {
        return {
          success: false,
          error: 'Could not extract meaningful content from the website',
          url,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        content,
        url,
        timestamp: new Date().toISOString(),
      };
    } catch (axiosError) {
      if (axios.isAxiosError(axiosError)) {
        if (axiosError.code === 'ECONNABORTED') {
          return {
            success: false,
            error: 'Request timed out',
            url,
            timestamp: new Date().toISOString(),
          };
        }
        if (axiosError.response) {
          return {
            success: false,
            error: `Server responded with status code ${axiosError.response.status}`,
            url,
            timestamp: new Date().toISOString(),
          };
        }
      }
      throw axiosError;
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
      url,
      timestamp: new Date().toISOString(),
    };
  }
}
