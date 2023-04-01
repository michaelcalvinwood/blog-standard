import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost({test}) {
    console.log('test', test);
    return <div>New Post Page</div>;
  }

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {}
    }}
)

  