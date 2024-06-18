
import { ImgurClient } from 'imgur';

const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  accessToken: process.env.IMGUR_ACCESS_TOKEN,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN
});

export const uploadImageToImgur = async (imageBuffer) => {
  try {
    const response = await client.upload({
      image: imageBuffer.toString('base64'),
      type: 'base64',
    });
    return response.data.link;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Image upload failed');
  }
};
