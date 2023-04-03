import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired (async function handler(req, res) {
    const { user } = await getSession(req, res);
    console.log('user', user)
    const client = await clientPromise;
    const db = client.db('blog_standard');
    const userProfile = await db.collection('users').findOne({
        auth0Id: user.sub
    })

    console.log('userProfile', userProfile)

    if (!userProfile?.availableTokens) return res.status(403);
    
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const { topic, keywords, specialInstructions } = req.body;
    console.log(topic, keywords, specialInstructions);
    
    const openai = new OpenAIApi(config);

    const prompt = specialInstructions ? 
        `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
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
        }` :
        `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
        The content should be formatted in SEO-friendly HTML.
        The response should include an HTML title and meta description that both include the keywords.
        The response should include the keywords as many times as possible.
        Also generate a list of tags that include the important words and phrases in the response. 
        The list of tags must also include the names of all people, places, companies, and organizations mentioned in the response.
        The return format must be stringified JSON in the following format: {
            "postContent": post content here
            "title": title goes here
            "metaDescription" : meta description goes here,
            "tags": array of tags go here
        }`

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0.25, // 0 - 1 : how much latitude do you want the engine to have (from 0% to 100% latitude)
        max_tokens: 3600, // maximum 4000 tokens for text-davinci-003
        prompt
    });

    const rawResult = response.data.choices[0].text.split("\n").join('');
    
    console.log('raw result', rawResult);

    const resultObj = JSON.parse(rawResult);

    console.log('resultObj', JSON.stringify(resultObj, null, 4));

    await db.collection('users').updateOne({
        auth0Id: user.sub
    }, {
        $inc: {
            availableTokens: -1
        }
    });

    const post = await db.collection("posts").insertOne({
        postContent: resultObj?.postContent,
        title: resultObj?.title,
        metaDescription: resultObj?.metaDescription,
        tags: resultObj?.tags,
        topic, keywords, specialInstructions,
        userId: userProfile._id,
        created: new Date()
    });

    res.status(200).json({post: resultObj})
  })
  