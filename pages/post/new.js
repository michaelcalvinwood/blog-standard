import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";

export default function NewPost(props) {
    const [postContent, setPostContent] = useState('');
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/generatePost`, {
            method: 'POST'
        })
        const json = await response.json();
        console.log('RESULT:', json.post);
        setPostContent(json.post.postContent);
    }

    return <div>
        <form>
            <div></div>
                <label>
                    <strong>Generate a blog post on the top of:</strong>
                </label>
                <textarea value={topic} onChange={(e) => setTopic(e.target.value)} />
            <div>
                <label>
                    <strong>Targeting the following keywords:</strong>
                </label>
                <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
            <div>
                <label>
                    <strong>Special Instructions (optional):</strong>
                </label>
                <textarea value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
            </div>
            <button type='submit' className="btn" onSubmit={handleSubmit}>
                Generate
            </button>
        </form>
        <div 
            dangerouslySetInnerHTML={{__html: postContent}}
            className="max-w-screen-sm p-10"
        ></div>
    </div>
  }

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {}
    }}
)

  