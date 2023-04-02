import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const topic = "The ten best places to visit in Europe and why";
    const keywords = 'European Vacation, Visit Europe';
    const specialInstructions = 'The response should include the name of at least one restaurant, one hotel, and one tourist attraction for each place.'

    const openai = new OpenAIApi(config);

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0.25, // 0 - 1 : how much latitude do you want the engine to have (from 0% to 100% latitude)
        max_tokens: 3600, // maximum 4000 tokens for text-davinci-003
        prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
        The content should be formatted in SEO-friendly HTML.
        The response should include an HTML title and meta description that both include the keywords.
        The response should include the keywords as many times as possible.
        ${specialInstructions}
        Also generate a list of tags that include the important words and phrases in the response. 
        The list of tags must also include the names of all people, places, companies, and organizations mentioned in the response.
        The return format must be stringified JSON in the following format: {
            "postContent": post content here
            "title": title goes here
            "metaDescription" : meta description goes here,
            "tags": array of tags go here
        }`,
    });

    

    res.status(200).json({post: JSON.parse(response.data.choices[0].text.replaceAll("\n", ""))})
  }
  