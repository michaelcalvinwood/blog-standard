import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import HeroImage from '../public/hero.webp';
import Image from "next/image";
import { Logo } from '../components/Logo';

export default function Home() {

  const {user} = useUser();

  if (typeof user !== 'undefined') console.log('user', user);

  return <div>
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="Hero" className="absolute w-screen h-screen" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
      </div>
     
      {/* {!user && <Link href="/api/auth/login">Login</Link>} */}
    </div>  
  </div>;
}
