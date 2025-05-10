import { JSDOM } from 'jsdom';

export async function scrapeFirstSearchResult(
  search: string,
  from: string = ''
): Promise<{ url: string } | null> {
  try {
    let query = search;

    if (from === 'Youtube Video') {
      query += ' youtube';
    } else if (from === 'Blog') {
      query += ' blog OR article OR pdf';
    }

    const encodedSearch = encodeURIComponent(query);

    const searchUrl = `https://www.bing.com/search?q=${encodedSearch}`;

    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
    await new Promise((resolve) => setTimeout(resolve, randomDelay));

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        DNT: '1',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch search results: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const html = await response.text();

    // Parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract the first result URL
    // Try multiple selector patterns to handle different search engines

    // Common result selectors to try
    const selectors = [
      // Mojeek specific selectors
      '.results-standard .result h2 a',
      '.results .result-title a',

      // Generic result selectors that might work with various engines
      '.results a',
      '.search-results a',
      '.serp a',
      '.web-results a',
      '.organic-results a',
      '.result h3 a',
      '.result-title a',
      'article a',
      'li h3 a',
      '.result a',
      'h2 a',
    ];

    // Try each selector until we find a valid result
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);

      for (const element of Array.from(elements)) {
        const anchorElement = element as HTMLAnchorElement;
        if (anchorElement.href) {
          const href = anchorElement.href;

          // Skip search engine's own links, pagination, etc.
          if (
            href.startsWith('http') &&
            !href.includes('mojeek.com') &&
            !href.includes('javascript:') &&
            !href.includes('/search?') &&
            !href.includes('?q=') &&
            !href.endsWith('.js') &&
            !href.endsWith('.css')
          ) {
            return { url: href };
          }
        }
      }
    }

    // If the above selectors don't work, try a more generic approach
    // Find all links and filter out ones that are likely to be navigation/internal links
    const allLinks = document.querySelectorAll('a');
    const externalLinks = Array.from(allLinks).filter((link) => {
      const href = link.href;
      return (
        href &&
        href.startsWith('http') &&
        !href.includes('mojeek.com') &&
        !href.includes('javascript:') &&
        !href.includes('?q=') &&
        !href.includes('/search') &&
        !href.includes('/settings') &&
        !href.includes('/about') &&
        !href.includes('/privacy') &&
        !href.includes('/contact') &&
        !href.includes('/help') &&
        !href.includes('/login') &&
        !href.endsWith('.js') &&
        !href.endsWith('.css')
      );
    });

    if (externalLinks.length > 0) {
      return { url: externalLinks[0].href };
    }

    console.log('No search results found');
    return null;
  } catch (error) {
    console.error('Error scraping search results:', error);
    return null;
  }
}
