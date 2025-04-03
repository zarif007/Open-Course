import axios from 'axios';
import { Parser, DomHandler } from 'htmlparser2';

export async function scrapeWebsite(url: string): Promise<{
  success: boolean;
  title?: string;
  meta?: Record<string, string>;
  body?: string;
  links?: string[];
  error?: string;
}> {
  try {
    if (!url.startsWith('http')) {
      throw new Error('Invalid URL');
    }

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    let title = '';
    let body = '';
    const meta: Record<string, string> = {};
    const links: string[] = [];
    let inScriptOrStyle = false; // Flag to track if inside <script> or <style>

    const handler = new DomHandler((error, dom) => {
      if (error) throw error;

      const traverse = (nodes: any[]) => {
        for (const node of nodes) {
          if (node.type === 'tag') {
            if (node.name === 'title' && node.children?.[0]?.type === 'text') {
              title = node.children[0].data.trim();
            }
            if (
              node.name === 'meta' &&
              node.attribs?.name &&
              node.attribs?.content
            ) {
              meta[node.attribs.name] = node.attribs.content;
            }
            if (node.name === 'a' && node.attribs?.href) {
              if (links.length < 10) {
                links.push(node.attribs.href);
              }
            }
            if (node.name === 'script' || node.name === 'style') {
              inScriptOrStyle = true; // Set flag when entering script or style
              continue;
            }
          }
          if (node.type === 'text' && !inScriptOrStyle) {
            // Only add text if not inside script or style
            body += node.data.trim() + ' ';
          }
          if (node.children) traverse(node.children);
          if (
            node.type === 'tag' &&
            (node.name === 'script' || node.name === 'style')
          ) {
            inScriptOrStyle = false; // Reset flag when exiting script or style
          }
        }
      };
      traverse(dom);
    });

    const parser = new Parser(handler, { decodeEntities: true });
    parser.write(data);
    parser.end();

    body = body.replace(/\s+/g, ' ').trim();

    return {
      success: true,
      title,
      meta,
      body,
      links,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
