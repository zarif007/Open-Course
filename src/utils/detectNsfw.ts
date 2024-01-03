import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.NEXT_PUBLIC_CLARIFAI_API_KEY as string,
});

const detectNSFW = async (imageUrl: string) => {
  try {
    const response = await clarifaiApp.models.predict(
      Clarifai.NSFW_MODEL,
      imageUrl
    );
    return response;
  } catch (error) {
    console.error('Clarifai API error:', error);
    throw new Error('Error communicating with Clarifai');
  }
};

export default detectNSFW;
