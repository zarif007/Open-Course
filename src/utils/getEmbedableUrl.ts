const url = require('url');

function extractIdFromUrl(inputUrl: string) {
  const parsedUrl = new URL(inputUrl);

  // Extract the ID from the URL based on the platform
  let id = '';

  let url = inputUrl;
  if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
    const videoIdMatch = parsedUrl.search.match(/[?&]v=([^&]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      id = videoIdMatch[1];
      url = `https://www.youtube.com/embed/${id}`
    }
  } else if (parsedUrl.hostname.includes('dailymotion.com')) {
    const videoIdMatch = parsedUrl.pathname.match(/\/video\/([^/]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      id = videoIdMatch[1];
      url = `https://www.dailymotion.com/embed/video/${id}`
    }
  } else if (parsedUrl.hostname.includes('vimeo.com')) {
    const videoIdMatch = parsedUrl.pathname.match(/\/(\d+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      id = videoIdMatch[1];
      url = `https://player.vimeo.com/video/${id}`
    }
  } else if (parsedUrl.hostname.includes('codesandbox.io')) {
    const sandboxIdMatch = parsedUrl.pathname.match(/\/s\/([^/]+)/);
    if (sandboxIdMatch && sandboxIdMatch[1]) {
      id = sandboxIdMatch[1];
      url = `https://codesandbox.io/embed/${id}`
    }
  } else if (parsedUrl.hostname.includes('facebook.com')) {
    const postIdMatch = parsedUrl.search.match(/[?&]v=([^&]+)/);
    if (postIdMatch && postIdMatch[1]) {
      id = postIdMatch[1];
      url = `https://www.facebook.com/plugins/video.php?href=${inputUrl}&show_text=0&width=560`
    }
  } else if (parsedUrl.hostname.includes('figma.com')) {
    const fileIdMatch = parsedUrl.pathname.match(/\/file\/([^/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      id = fileIdMatch[1];
      url = `https://www.figma.com/embed?embed_host=astra&url=${encodeURIComponent(inputUrl)}`
    }
  } else if (parsedUrl.hostname.includes('gfycat.com')) {
    const gfyIdMatch = parsedUrl.pathname.match(/\/(?:detail\/|ifr\/)([^/]+)/);
    if (gfyIdMatch && gfyIdMatch[1]) {
      id = gfyIdMatch[1];
      url = `https://gfycat.com/ifr/${id}`
    }
  } else if (parsedUrl.hostname.includes('gist.github.com')) {
    const gistIdMatch = parsedUrl.pathname.match(/\/([^/]+)\/([^/]+)$/);
    if (gistIdMatch && gistIdMatch[2]) {
      id = gistIdMatch[2];
      url = `https://gist.github.com/${id}`
    }
  } else if (parsedUrl.hostname.includes('imgur.com')) {
    const imgurIdMatch = parsedUrl.pathname.match(/\/(a|gallery)?\/([^/]+)/);
    if (imgurIdMatch && imgurIdMatch[2]) {
      id = imgurIdMatch[2];
    }
  } else if (parsedUrl.hostname.includes('instagram.com')) {
    const postUrlMatch = parsedUrl.pathname.match(/\/p\/([^/]+)/);
    if (postUrlMatch && postUrlMatch[1]) {
      id = postUrlMatch[1];
    }
  } else if (parsedUrl.hostname.includes('jsfiddle.net')) {
    const fiddleIdMatch = parsedUrl.pathname.match(/\/([^/]+)\/?$/);
    if (fiddleIdMatch && fiddleIdMatch[1]) {
      id = fiddleIdMatch[1];
    }
  } else if (parsedUrl.hostname.includes('mixcloud.com')) {
    const mixcloudIdMatch = parsedUrl.pathname.match(/\/([^/]+)\/([^/]+)/);
    if (mixcloudIdMatch && mixcloudIdMatch[2]) {
      id = `${mixcloudIdMatch[1]}/${mixcloudIdMatch[2]}`;
    }
  } else if (parsedUrl.hostname.includes('replit.com')) {
    const replIdMatch = parsedUrl.pathname.match(/\/(@[^/]+)\/([^/]+)/);
    if (replIdMatch && replIdMatch[1] && replIdMatch[2]) {
      id = `${replIdMatch[1]}/${replIdMatch[2]}`;
    }
  } else if (parsedUrl.hostname.includes('soundcloud.com')) {
    const trackIdMatch = parsedUrl.pathname.match(/\/([^/]+)\/([^/]+)/);
    if (trackIdMatch && trackIdMatch[2]) {
      id = `${trackIdMatch[1]}/${trackIdMatch[2]}`;
    }
  } else if (parsedUrl.hostname.includes('twitch.tv')) {
    const twitchIdMatch = parsedUrl.pathname.match(/\/videos\/(\d+)/);
    if (twitchIdMatch && twitchIdMatch[1]) {
      id = twitchIdMatch[1];
      url = `https://player.twitch.tv/?video=${id}`
    }
  } else if (parsedUrl.hostname.includes('twitter.com')) {
    const tweetIdMatch = parsedUrl.pathname.match(/\/[^/]+\/status\/(\d+)/);
    if (tweetIdMatch && tweetIdMatch[1]) {
      id = tweetIdMatch[1];
    }
  } else if (parsedUrl.hostname.includes('dropbox.com')) {
    const dropboxIdMatch = parsedUrl.pathname.match(/\/s\/([^/]+)/);
    if (dropboxIdMatch && dropboxIdMatch[1]) {
      id = dropboxIdMatch[1];
    }
  }

  return url;
}

function createEmbeddableUrls(inputUrl: string) {
  const url = extractIdFromUrl(inputUrl);

//   if (!id) {
//     throw new Error('Invalid URL or unsupported platform');
//   }

  const supportedPlatforms = [
    "youtube.com",
    "youtu.be",
    "youtube-nocookie.com",
    "dailymotion.com",
    "codesandbox.io",
    "facebook.com",
    "figma.com",
    "gfycat.com",
    "gist.github.com",
    "google.com",
    "imgur.com",
    "instagram.com",
    "jsfiddle.net",
    "mixcloud.com",
    "replit.com",
    "soundcloud.com",
    "twitch.tv",
    "twitter.com",
    "vimeo.com",
    "dropbox.com",
  ];

//   const embeddableUrls = supportedPlatforms.map((platform) => {


//         return `https://gfycat.com/ifr/${id}`;
//       case "gist.github.com":
//         return `https://gist.github.com/${id}.js`;
//       case "google.com":
//         return `https://docs.google.com/file/d/${id}/preview`;
//       case "imgur.com":
//         return `https://imgur.com/${id}/embed`;
//       case "instagram.com":
//         return `https://www.instagram.com/p/${id}/embed`;
//       case "jsfiddle.net":
//         return `https://jsfiddle.net/${id}/embedded/`;
//       case "mixcloud.com":
//         return `https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(inputUrl)}`;
//       case "replit.com":
//         return `https://replit.com/@${id}`;
//       case "soundcloud.com":
//         return `https://w.soundcloud.com/player/?url=${encodeURIComponent(inputUrl)}`;
//       case "twitch.tv":
//         return `https://player.twitch.tv/?video=${id}`;
//       case "twitter.com":
//         return `https://twitframe.com/show?url=${encodeURIComponent(inputUrl)}`;
//       case "vimeo.com":
//         return `https://player.vimeo.com/video/${id}`;
//       case "dropbox.com":
//         return `https://www.dropbox.com/s/${id}/preview`;
//       default:
//         return inputUrl;
//     }
//   });

  return url
}

export default createEmbeddableUrls
