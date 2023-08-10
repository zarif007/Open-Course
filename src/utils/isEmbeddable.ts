import axios from "axios";


async function isEmbeddable(url: string) {
  try {
    
    try {
        const response = await axios.head(url);
        const xFrameOptions = response.headers["x-frame-options"];
        console.log(xFrameOptions)
      } catch (error) {
        console.error("Error:");
      }
    return true
  } catch (error: any) {
    console.error('Error:', error.message);
    return false;
  }
}

export default isEmbeddable;
