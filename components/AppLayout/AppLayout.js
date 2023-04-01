import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";


export const AppLayout = ({children}) => {
    const {user} = useUser();
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className='flex flex-col text-white overflow-hidden'>
                <div className="bg-slate-800">
                    <div>Logo</div>
                    <div>cta button</div>
                    <div>tokens</div>
                </div>
                <div className="flex-1 overflow-auto  bg-gradient-to-b from-slate-800 to-cyan-800">List of all posts</div>
                <div className="bg-cyan-800">
                {user && <div className=" flex items-center gap border-t border-t-black/50 h-20 px-2">
                    <Image className="mr-2 rounded-full" src={user.picture} alt={user.name} height={50} width={50} />
                    <div>
                        <div>{user.email}</div>
                        <Link href="/api/auth/logout">Logout</Link>
                    </div>
                 </div>
                }
                </div>
            </div>
            <div className='bg-yellow-500'>{children}</div>
        </div>
    )
}