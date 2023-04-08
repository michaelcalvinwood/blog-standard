import React, { useCallback, useState } from "react";

const PostsContext = React.createContext({});

export default PostsContext;

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState([]);

    const setPostsFromSSR = useCallback((postsFromSSR = []) => {
        console.log('postsFromSSR', postsFromSSR);
        setPosts(postsFromSSR);
    }, [])

    const getPosts = useCallback(async ({lastPostDate}) => {
        console.log('getPosts', lastPostDate);

        const result = await fetch('/api/getPosts', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({lastPostDate})
        })
        console.log('getPosts result', result);
        const json = await result.json();
        const postsResult = json.posts || [];

        console.log('postsResult', postsResult);

        setPosts(curPosts => {
            const newPosts = [...curPosts];
            postsResult.forEach(post => {
                const exists = newPosts.find(newPost => newPost._id === post._id);
                if (!exists) newPosts.push(post);
            })
            return newPosts;
        })

    }, [])

    return (
        <PostsContext.Provider
            value={{posts, setPostsFromSSR, getPosts}}
        >
            {children}
        </PostsContext.Provider>
    )
}