import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export default function Post(props) {
    console.log('Post props', props);

    return <div>Post Page</div>;
  }
  

Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
   async getServerSideProps(ctx) {
        const userSession = await getSession(ctx.req, ctx.res);
        const client = await clientPromise;
        const db = client.db('blog_standard');
        console.log('userSession', userSession.user.sub);

        const user = await db.collection('users').findOne({
            auth0Id: userSession.user.sub
        })

        console.log('user', user);

        const post = await db.collection('posts').findOne({
            _id: new ObjectId(ctx.params.postId),
            userId: user._id
        });

        if (!post) {
            return {
                redirect: {
                    destination: "/post/new",
                    permanent: false
                }
            }
        }

        return {
            props: {
                postContent: post.postContent,
                title: post.title,
                metaDescription: post.metaDescription,
                tags: post.tags,
                keywords: post.keywords,
                topic: post.topic,
                specialInstructions: post.specialInstructions 
            }
        }
   }
})
