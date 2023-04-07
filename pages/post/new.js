import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

export default function NewPost(props) {
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [generating, setGenerating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGenerating(true);
        try {
            const response = await fetch(`/api/generatePost`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({topic, keywords, specialInstructions})
            })
            const json = await response.json();
            console.log('RESULT', json);
            if (json?.postId) {
                router.push(`/post/${json.postId}`);
            }
        } catch (err) {
            console.error(err);
            setGenerating(false);
        }
    }

    return <div className="h-full overflow-hidden">
        { !!generating && <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
            <FontAwesomeIcon icon={faBrain} className="text-8xl"/>
            <h6>Generating...</h6>
        </div>
        }
        { !generating && <div className="w-full h-full flex flex-col overflow-auto">
            <form onSubmit={handleSubmit} className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
                <div></div>
                    <label>
                        <strong>Generate a blog post on the topic of:</strong>
                    </label>
                    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)} />
                <div>
                    <label>
                        <strong>Targeting the following keywords (separated by a comma):</strong>
                    </label>
                    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                </div>
                <div>
                    <label>
                        <strong>Special Instructions (optional):</strong>
                    </label>
                    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
                </div>
                <button type='submit' className="btn" onSubmit={handleSubmit} disabled={!topic || !keywords}>
                    Generate
                </button>
            </form>
          </div>

        }
       
    </div>
  }

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);

        if (!props.availableTokens) {
            return {
                redirect: {
                    destination: '/token-topup',
                    permanent: false
                },
            }
        }

        return {
            props
        }
    }
})
  