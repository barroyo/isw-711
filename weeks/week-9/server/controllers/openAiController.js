const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

/**
 * Executes prompt
 *
 * @param {*} req
 * @param {*} res
 */
const executePrompt = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();

  res.status(200); // CREATED

  res.json(response);

};

const createImage = async (req, res) => {
  const { OpenAIApi } = require("openai");
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: "Bob Esponja en un cadillac",
    n: 2,
    size: "1024x1024",
  });
  if(response) {
    res.status(201); // CREATED
    res.json(response.data);
  } else {
    res.status(422);
    res.json({
      message: "There was an error executing the open AI method"
    })
  }
}


module.exports = {
  executePrompt,
  createImage
}