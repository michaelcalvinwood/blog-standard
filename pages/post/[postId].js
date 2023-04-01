export default function Post() {
    return <div>Post Page</div>;
  }
  
export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {}
    }}
)
