import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function TokenTopUp() {
    const handleClick = async () => {
        console.log('TokenTopUp handleClick');
        const response = await fetch('/api/addTokens', {
            method: "POST"
        })
        const json = await response.json();
        console.log('TokenTopUp json', json);
    }

    

    return (
        <div>
            <h1>
                Token Top Up Page
            </h1>
            <button className="btn" onClick={handleClick}>Add Tokens</button>
        </div>
    )
  }
  
TokenTopUp.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);
        return {
            props
        }
    }
})
