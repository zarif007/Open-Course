import axios from "axios";

async function fetchOGImage(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    return html;
  } catch (error) {
    return null;
  }
}

function fetchImage(html: any) {}

async function getOGImage(url: string) {
  const html = await fetchOGImage(url);
  if (html) {
    const image = fetchImage(html);
    return image;
  }
}

export default getOGImage;
