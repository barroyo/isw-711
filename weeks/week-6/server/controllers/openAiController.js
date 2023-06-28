import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "",
    apiKey: 'sk-',
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


module.exports = {
  executePrompt
}