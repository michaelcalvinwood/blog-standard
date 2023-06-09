import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../Logo";
import { useContext, useEffect } from "react";
import PostsContext from "../../context/postsContext";


export const AppLayout = ({children, availableTokens, posts: postsFromSSR, postId}) => {
   
    const {user} = useUser();

    const {posts, setPostsFromSSR, getPosts} = useContext(PostsContext);

    useEffect(() => {
        setPostsFromSSR(postsFromSSR)
    }, [postsFromSSR, setPostsFromSSR])
    
    return (
        <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
            <div className='flex flex-col text-white overflow-hidden'>
                <div className="bg-slate-800 px-2">
                    <Logo />
                    <Link 
                        href="/post/new" 
                        className="btn"
                    >
                        New Post
                    </Link>
                    <Link 
                        href="/token-topup"
                        className="block mt-2 text-center"
                    >
                        <FontAwesomeIcon icon={faCoins} className="text-yellow-500"/>
                        <span className="pl-1 ">{availableTokens} tokens available</span>
                    </Link>
                </div>
                <div className="px-4 flex-1 overflow-auto  bg-gradient-to-b from-slate-800 to-cyan-800">
                    {posts.map(post => {
                        return (
                            <Link 
                                className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? 'bg-white/20 border-white' : ''}`}
                                key={post._id} 
                                href={`/post/${post._id}`}
                            >
                                {post.topic}
                            </Link>)
                    })}
                    <div onClick={() => {
                        getPosts({lastPostDate: posts[posts.length - 1].created})
                    }} className="btn block m-auto mt-2" style={{width: '90%'}}>Load More Posts</div>
                </div>
                <div className="bg-cyan-800">
                {!!user && <div className=" flex items-center gap border-t border-t-black/50 h-20 px-2">
                    <Image className="mr-2 rounded-full" src={user.picture} alt={user.name} height={50} width={50} />
                    <div>
                        <div>{user.email}</div>
                        <Link href="/api/auth/logout">Logout</Link>
                    </div>
                 </div>
                }
                </div>
            </div>
            {children}
        </div>
    )
}