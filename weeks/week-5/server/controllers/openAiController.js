import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-js4DAHm9u6nYFpbj3HyK5db8",
    apiKey: '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',
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