import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";

export default function Home() {

  const {user} = useUser();

  if (typeof user !== 'undefined') console.log('user', user);

  return <div>
    <div>
      {user && <div>
        <Image src={user.picture} alt={user.name} height={50} width={50} />
        {user.email}<br />
        <Link href="/api/auth/logout">Logout</Link>
        </div>
      }
      {!user && <Link href="/api/auth/login">Login</Link>}
    </div>  
  </div>;
}
