// app/api/check-url/route.ts
import { NextResponse } from 'next/server';

const YOUTUBE_DOMAINS = [
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'm.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'music.youtube.com',
  'gaming.youtube.com',
];

function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return YOUTUBE_DOMAINS.some((domain) => urlObj.hostname === domain);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ isEmbeddable: false });
    }

    if (isYouTubeUrl(url)) {
      return NextResponse.json({ isEmbeddable: true });
    }

    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; URLChecker/1.0;)',
      },
    });

    const xFrameOptions = response.headers.get('x-frame-options');
    const csp = response.headers.get('content-security-policy');

    const isEmbeddable = !(
      xFrameOptions?.toLowerCase().includes('deny') ||
      xFrameOptions?.toLowerCase().includes('sameorigin') ||
      csp?.toLowerCase().includes('frame-ancestors')
    );

    return NextResponse.json({ isEmbeddable });
  } catch (error) {
    return NextResponse.json({ isEmbeddable: false });
  }
}
