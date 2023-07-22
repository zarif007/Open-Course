import axios from "axios";
import cheerio from "cheerio";

async function fetchOGImage(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    return html;
  } catch (error) {
    console.error("Error fetching the webpage:", error);
    return null;
  }
}

function fetchImage(html: any) {
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr("content");
  return ogImage || null;
}

async function getOGImage(url: string) {
  const html = await fetchOGImage(url);
  if (html) {
    const image = fetchImage(html);
    return image;
  }
}

export default getOGImage;
