import axios from "axios";

const checkIfUrlIsEmbeddable = async (url: string) => {
  try {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.display = "none"; // Hide the iframe

    document.body.appendChild(iframe);

    iframe.onload = () => {
      try {
        const frameDocument = iframe.contentDocument;
        const xFrameOptionsHeader = frameDocument
          ?.defaultView!.getComputedStyle(frameDocument.documentElement, null)
          .getPropertyValue("x-frame-options");

        if (xFrameOptionsHeader) {
          console.log(xFrameOptionsHeader);
        } else {
          console.log("No X-Frame-Options header found.");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("Error occurred while checking the header.");
      } finally {
        // Clean up the iframe
        document.body.removeChild(iframe);
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export default checkIfUrlIsEmbeddable;
