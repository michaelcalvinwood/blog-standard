export default function TokenTopUp() {
    return <div>Token Top Up Page</div>;
  }
  

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {}
    }}
)
