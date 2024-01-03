const bannedList = [];

const validateURL = (url: string) => {
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

export default validateURL;
