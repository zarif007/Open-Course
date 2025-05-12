'use server';

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

    const firstResult = data.organic?.[0]?.link;
    if (firstResult) {
      return { url: firstResult };
    }

    console.log('No search results found from Serper');
    return null;
  } catch (error) {
    console.error('Error using Serper API:', error);
    return null;
  }
}
