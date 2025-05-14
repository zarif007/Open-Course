const validateURL = (url: string) => {
  try {
    // More flexible URL regex that handles common cases
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s?#]*)?(\?[^#]*)?(#.*)?$/;

    if (!urlRegex.test(url)) {
      return false; // Invalid URL format
    }

    // Parse the URL to validate its structure
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);

    // Check for valid TLD (optional)
    if (!parsedUrl.hostname.includes('.')) {
      return false;
    }

    // Check for dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    if (dangerousProtocols.includes(parsedUrl.protocol.toLowerCase())) {
      return false;
    }

    // Check for potential XSS vulnerabilities (more comprehensive)
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /expression\(/i,
      /eval\(/i,
    ];

    const urlLower = url.toLowerCase();
    if (xssPatterns.some((pattern) => pattern.test(urlLower))) {
      return false;
    }

    // Allow URL-encoded characters but check for double encoding
    try {
      const decodedOnce = decodeURIComponent(url);
      const decodedTwice = decodeURIComponent(decodedOnce);
      if (decodedTwice !== decodedOnce) {
        return false; // Double-encoded URL
      }
    } catch (e) {
      return false; // Malformed encoding
    }

    return true; // URL is valid
  } catch (e) {
    return false; // URL parsing failed
  }
};

export default validateURL;
