import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Home() {

  const {user} = useUser();

  if (typeof user !== 'undefined') console.log('user', user);

  return <div>
    <div>
     
      {!user && <Link href="/api/auth/login">Login</Link>}
    </div>  
  </div>;
}
