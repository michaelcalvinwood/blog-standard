import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function TokenTopUp() {
    return <div>Token Top Up Page</div>;
  }
  

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {}
    }}
)
