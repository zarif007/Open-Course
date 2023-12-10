import { IEmbedContent } from '@/types/courseTopic';
import { ZodType, z } from 'zod';

export const embedContentSchema: ZodType<IEmbedContent> = z.object({
  title: z.string().min(2).max(200),
  url: z.string().refine((url) => validateURL(url), { message: 'Invalid URL' }),
  description: z.string().optional(),
  duration: z.number().min(0).max(10000),
  source: z.string().optional(),
});

const validateURL = (url: string) => {
  // Basic URL format validation using a regular expression
  const urlRegex =
    /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;

  if (!urlRegex.test(url)) {
    return false; // Invalid URL format
  }

  // Check for secure protocol (https)
  const isSecureProtocol = new URL(url).protocol === 'https:';

  if (!isSecureProtocol) return false;

  // Check for potential XSS vulnerabilities
  const xssStrings = ['<script', 'javascript:'];
  if (xssStrings.some((xssString) => url.includes(xssString))) {
    return false; // Potential XSS vulnerability
  }

  // Check for known dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
  if (
    dangerousProtocols.some((protocol) =>
      url.toLowerCase().startsWith(protocol)
    )
  ) {
    return false; // URL uses a dangerous protocol
  }

  // Check for URL encoding-related issues
  const decodedUrl = decodeURIComponent(url);
  if (decodedUrl !== url) {
    return false; // URL contains encoded characters
  }

  return true; // URL is valid
};
