const validateURL = (url: string) => {
  try {
    let parsedUrl;
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (e) {
      return false;
    }

    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    if (
      dangerousProtocols.some(
        (protocol) => parsedUrl.protocol.toLowerCase() === protocol
      )
    ) {
      return false;
    }

    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const isIpAddress = ipv4Regex.test(parsedUrl.hostname);

    if (isIpAddress) {
      const ipParts = parsedUrl.hostname.split('.').map(Number);
      const validIp = ipParts.every((part) => part >= 0 && part <= 255);
      if (!validIp) {
        return false;
      }
    } else if (
      !parsedUrl.hostname.includes('.') ||
      !/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        parsedUrl.hostname
      )
    ) {
      return false;
    }

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

    try {
      const decodedOnce = decodeURIComponent(url);
      const decodedTwice = decodeURIComponent(decodedOnce);
      if (decodedTwice !== decodedOnce) {
        return false;
      }
    } catch (e) {
      return false;
    }

    if (
      parsedUrl.search &&
      xssPatterns.some((pattern) => pattern.test(parsedUrl.search))
    ) {
      return false;
    }

    if (
      parsedUrl.hash &&
      xssPatterns.some((pattern) => pattern.test(parsedUrl.hash))
    ) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

export default validateURL;
