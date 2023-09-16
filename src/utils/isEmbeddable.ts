import axios from "axios";

async function isEmbeddable(url: string) {
  try {
    try {
      const response = await axios.head(url);
      const xFrameOptions = response.headers["x-frame-options"];
    } catch (error) {
      throw error;
    }
    return true;
  } catch (error: any) {
    throw error;
    return false;
  }
}

export default isEmbeddable;
