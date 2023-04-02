import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const {user} = await getSession(req, res);

    const client = await clientPromise;
    const db = client.db("blog_standard");
    const userProfile = await db.collection('users').updateOne({
      auto0Id: user.sub
    }, {
      $inc: {
        availableTokens: 10
      },
      $setOnInsert: {
        auto0Id: user.sub
      }
    }, 
      {
        upsert: true
      }
    )
    console.log('userProfile', userProfile);

    res.status(200).json({ name: 'John Doe' })
  }
  