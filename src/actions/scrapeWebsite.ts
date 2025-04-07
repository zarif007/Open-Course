'use server';

import * as https from 'https';
import * as http from 'http';
import { JSDOM } from 'jsdom';
import { URL } from 'url';

type ScrapeResult = {
  success: boolean;
  textContent?: string;
  error?: string;
  url: string;
  timestamp: string;
  isYouTube?: boolean;
};

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const requestModule = parsedUrl.protocol === 'https:' ? https : http;

      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        },
      };

      const req = requestModule.request(options, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch the website: ${res.statusCode}`));
          return;
        }

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    } catch (error) {
      reject(error);
    }
  });
}

function isYouTubeUrl(url: string): boolean {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;

  return (
    hostname === 'youtube.com' ||
    hostname === 'www.youtube.com' ||
    hostname === 'm.youtube.com' ||
    hostname === 'youtu.be' ||
    hostname.endsWith('.youtube.com')
  );
}

function extractYouTubeVideoId(url: string): string | null {
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
}

async function fetchYouTubeTranscript(videoId: string): Promise<string> {
  try {
    const html = await fetchUrl(`https://www.youtube.com/watch?v=${videoId}`);

    const dom = new JSDOM(html);
    const document = dom.window.document;

    let scriptContent = '';
    const scripts = document.querySelectorAll('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.textContent?.includes('captionTracks')) {
        scriptContent = script.textContent;
        break;
      }
    }

    if (scriptContent) {
      const captionTrackMatch = scriptContent.match(
        /"captionTracks":\s*(\[.*?\])/
      );
      if (captionTrackMatch && captionTrackMatch[1]) {
        try {
          const captionTracks = JSON.parse(
            captionTrackMatch[1].replace(/\\"/g, '"')
          );
          if (captionTracks.length > 0 && captionTracks[0].baseUrl) {
            const captionUrl = captionTracks[0].baseUrl;
            const captionContent = await fetchUrl(captionUrl);

            const captionDom = new JSDOM(captionContent, {
              contentType: 'text/xml',
            });
            const captionDoc = captionDom.window.document;

            const textElements = captionDoc.querySelectorAll('text');
            const transcriptLines = Array.from(textElements).map(
              (el) => el.textContent
            );

            return transcriptLines.join(' ');
          }
        } catch (e) {}
      }
    }

    const transcriptPanel = document.querySelector('.ytd-transcript-renderer');
    if (transcriptPanel) {
      const transcriptLines = Array.from(
        transcriptPanel.querySelectorAll('.ytd-transcript-segment-renderer')
      )
        .map((el) => el.textContent?.trim())
        .filter(Boolean);

      if (transcriptLines.length > 0) {
        return transcriptLines.join(' ');
      }
    }

    return 'YouTube transcript could not be extracted automatically. YouTube transcripts are typically loaded dynamically and may require browser interaction to access.';
  } catch (error) {
    return (
      'Error fetching YouTube transcript: ' +
      (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function scrapeWebsite(url: string): Promise<ScrapeResult> {
  try {
    let validUrl: URL;
    try {
      validUrl = new URL(url);
      if (!['http:', 'https:'].includes(validUrl.protocol)) {
        throw new Error('URL must use HTTP or HTTPS protocol');
      }
    } catch (e) {
      return {
        success: false,
        error: 'Invalid URL format',
        url,
        timestamp: new Date().toISOString(),
      };
    }

    if (isYouTubeUrl(url)) {
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

      const transcript = await fetchYouTubeTranscript(videoId);

      return {
        success: true,
        textContent: transcript,
        url,
        timestamp: new Date().toISOString(),
        isYouTube: true,
      };
    }

    const html = await fetchUrl(url);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    document.querySelectorAll('script, style').forEach((el) => el.remove());

    const bodyElement = document.querySelector('body');
    let textContent = bodyElement
      ? bodyElement.textContent?.replace(/\s+/g, ' ').trim()
      : 'No text content found';

    if (!textContent) {
      return {
        success: true,
        textContent: 'No text content found',
        url,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      textContent,
      url,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return {
      success: false,
      error: errorMessage,
      url,
      timestamp: new Date().toISOString(),
    };
  }
}
