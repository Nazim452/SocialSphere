import React, { useEffect, useState } from 'react'
import UserHeader from '../component/UserHeader'
import UserPost from '../component/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../component/Post'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postAtom from '../atoms/postsAtom';


const UserPage = () => {

  const { user, loading } = useGetUserProfile();
  // co nst [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  // const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState();
  const [posts, setPosts] = useRecoilState(postAtom)
  const [fetchingPost, setFetchingPost] = useState(true);

  useEffect(() => {


    // geting all the post corresponding to the user


    const getPosts = async () => {
      setFetchingPost(true); //
      try {

        if(!user) return;
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        // console.log(data);
        setPosts(data);

      } catch (error) {
        console.log("Error in getting getPosts", error);
        setPosts([])

        showToast("Error", error.message, "error");

      }
      finally {
        setFetchingPost(false);
      }
    }

    getPosts();

  }, [username, showToast, setPosts]);

  // console.log("Post is here of recoil state", posts);

  if (!user && loading) return (

    <Flex justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>

  );

  if (!user && !loading) return <h1>User not Found</h1>



  return (
    <>
      <UserHeader user={user} />

      {!fetchingPost && posts?.length === 0 && <h1>User Post not Found</h1>}


      {
        fetchingPost && (
          <Flex justifyContent={"center"} my={12}>

            <Spinner size={"xl"} />

          </Flex>
        )
      }

      {
        posts?.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy}  ></Post>
        ))
      }


    </>
  )
}

export default UserPage