import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
    console.log('/api/getPosts');
    try {
        const { user: {sub}} = await getSession(req, res);
        const client = await clientPromise;
        const db = client.db('blog_standard');
        const userProfile = await db.collection('users').findOne({
            auth0Id: sub
        })

        const {lastPostDate} = req.body;

        const posts = await db.collection('posts').find({
            userId: userProfile._id,
            created: {$lt: new Date(lastPostDate)}
        })
        .limit(5)
        .sort({
            created: -1
        })
        .toArray()

        console.log('/api/getPosts', posts.length)

        return res.status(200).json({posts})
    } catch (err) {
        console.error(err);

    }
})