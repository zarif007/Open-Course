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
    new URL(url);

    if (isYouTubeUrl(url)) {
      return await scrapeYouTubeInfo(url);
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
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

    $('script, style, noscript, iframe, svg').remove();

    const title = $('title').text().trim();
    const metaDescription = $('meta[name="description"]')
      .attr('content')
      ?.trim();

    const allTextContent: { selector: string; text: string }[] = [];

    const getElementText = (element: any): string => {
      if (element.type === 'text') {
        return $(element).text().trim();
      }

      const childrenText = $(element)
        .contents()
        .map((_, child) => getElementText(child))
        .get()
        .filter((text) => text.trim() !== '')
        .join(' ');

      return childrenText;
    };

    $('body *').each((_, element) => {
      if (
        [
          'script',
          'style',
          'meta',
          'link',
          'noscript',
          'iframe',
          'svg',
        ].includes(element.tagName)
      ) {
        return;
      }

      const $element = $(element);
      const directText = $element
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      if (directText) {
        allTextContent.push({
          selector: element.tagName,
          text: directText,
        });
      }
    });

    // Extract structured data
    const headings: { level: string; text: string }[] = [];
    $('h1, h2, h3, h4, h5, h6').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text) {
        headings.push({
          level: elem.tagName.toLowerCase(),
          text,
        });
      }
    });

    // Extract paragraphs
    const paragraphs: string[] = [];
    $('p').each((_, elem) => {
      const text = $(elem).text().trim();
      if (text) paragraphs.push(text);
    });

    // Extract images
    const images: { src: string; alt?: string }[] = [];
    $('img').each((_, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt');
      if (src) {
        images.push({ src, alt: alt?.trim() });
      }
    });

    // Extract links
    const links: { href: string; text: string }[] = [];
    $('a').each((_, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();
      if (href && text) {
        links.push({ href, text });
      }
    });

    // Extract meta tags
    const metaTags: { name: string; content: string }[] = [];
    $('meta').each((_, elem) => {
      const name = $(elem).attr('name') || $(elem).attr('property');
      const content = $(elem).attr('content');
      if (name && content) {
        metaTags.push({ name: name.trim(), content: content.trim() });
      }
    });

    // Get full text content (remove extra whitespace and normalize)
    const fullText = $('body').text().replace(/\s+/g, ' ').trim();

    // Build the response
    let content = '';

    if (title) {
      content += `Title: ${title}\n\n`;
    }

    if (metaDescription) {
      content += `Meta Description: ${metaDescription}\n\n`;
    }

    content += `Full Text Content:\n${fullText}\n\n`;

    if (headings.length) {
      content += 'Headings:\n';
      headings.forEach((h) => {
        content += `  ${h.level.toUpperCase()}: ${h.text}\n`;
      });
      content += '\n';
    }

    if (paragraphs.length) {
      content += 'Paragraphs:\n';
      paragraphs.forEach((p, i) => {
        content += `  ${i + 1}. ${p}\n`;
      });
      content += '\n';
    }

    // if (links.length) {
    //   content += 'Links:\n';
    //   links.forEach((link, i) => {
    //     content += `  ${i + 1}. [${link.text}] -> ${link.href}\n`;
    //   });
    //   content += '\n';
    // }

    // if (images.length) {
    //   content += 'Images:\n';
    //   images.forEach((img, i) => {
    //     content += `  ${i + 1}. Src: ${img.src}${
    //       img.alt ? `, Alt: ${img.alt}` : ''
    //     }\n`;
    //   });
    //   content += '\n';
    // }

    // if (metaTags.length) {
    //   content += 'Meta Tags:\n';
    //   metaTags.forEach((meta, i) => {
    //     content += `  ${i + 1}. Name: ${meta.name}, Content: ${meta.content}\n`;
    //   });
    //   content += '\n';
    // }

    if (allTextContent.length) {
      content += 'Detailed Text Elements:\n';
      allTextContent.forEach((item, i) => {
        content += `  Element [${item.selector}]: ${item.text}\n`;
      });
      content += '\n';
    }

    return {
      success: true,
      url,
      timestamp: new Date().toISOString(),
      content: content.trim() || 'No content extracted',
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
