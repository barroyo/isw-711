require('dotenv').config();
const { OpenAI } = require("openai");

/**
 * Generate an image using OpenAI
 *
 * @param {*} args
 */
const createImage = async (args) => {
  try {
    const { prompt } = args;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
    const response = await openai.images.generate({
      prompt,
      n: 2,
      size: "1024x1024",
    });

    // Returns an array of image URLs
    return response.data.map(img => img.url);
  } catch (error) {
    console.error('Image generation error:', error);
    return null;
  }
}


module.exports = {
  createImage
}