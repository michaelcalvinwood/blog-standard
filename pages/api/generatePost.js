import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
    console.log('handler');

    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0, // 0 - 1 : how much latitude do you want the engine to have (from 0% to 100% latitude)
        max_tokens: 3600, // maximum 4000 tokens for text-davinci-003
        prompt: "Generate a blog post about owning dogs"
    });

    console.log('response: ', response);

    res.status(200).json({post: response.data.choices})
  }
  