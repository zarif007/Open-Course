'use server';

import { nextApiEndPoint } from '@/utils/apiEndpoints';

export async function scrapeFirstSearchResult(
  search: string,
  from: string = ''
): Promise<{ url: string } | null> {
  try {
    let query = search + ' ' + from;

    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
      }),
    });

    if (!response.ok) {
      console.error(
        `Serper API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();

    let firstResult = data.organic?.[0]?.link;

    if (!firstResult) {
      console.log('No search results found from Serper');
      return null;
    }

    let i = 0;

    while (i < data.organic.length) {
      const url = data.organic[i].link;

      const response = await fetch(`${nextApiEndPoint}/check-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const isEmbeddable = (await response.json()).isEmbeddable;

      if (isEmbeddable) {
        firstResult = url;
        break;
      }
      i++;
    }

    return { url: firstResult };
  } catch (error) {
    console.error('Error using Serper API:', error);
    return null;
  }
}
