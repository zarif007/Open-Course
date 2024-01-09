import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.NEXT_PUBLIC_CLARIFAI_API_KEY as string,
});

const THRESH_HOLD = 0.5;

const detectNSFW = async (imageUrl: string) => {
  try {
    let isNSFW = true;
    const response = await clarifaiApp.models.predict(
      Clarifai.NSFW_MODEL,
      imageUrl
    );

    response.outputs[0].data.concepts.map((r: any) => {
      if (r.name === 'nsfw' && r.value < THRESH_HOLD) {
        isNSFW = false;
      }
    });

    return isNSFW;
  } catch {
    return false;
  }
};

export default detectNSFW;
