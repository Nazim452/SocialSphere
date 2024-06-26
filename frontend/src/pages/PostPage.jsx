import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { BsThreeDots } from 'react-icons/bs'
import Action from '../component/Action'
import Comment from '../component/Comment'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from '../atoms/userAtom'
import { DeleteIcon } from '@chakra-ui/icons';
import postAtom from '../atoms/postsAtom'


const PostPage = () => {
  const navigate = useNavigate();

  const { user, loading } = useGetUserProfile();

  // const [post, setPost] = useState(null);
  const[posts, setPosts] = useRecoilState(postAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const currentPost = posts[0];


  useEffect(() => {

    const getPost = async () => {
      setPosts([]);

      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        // console.log(data);
        setPosts([data]) // aray because postAtom  is an collection of array - in action.jsx we iterating on post. So this is array then iterable

      } catch (error) {
        console.log("Error in getting Post");
        showToast("Error", data.error, "error");


      }

    }
    getPost();
  }, [showToast, pid,setPosts])

  const handleDeletePost = async () => {
    try {

      if (!window.confirm('Are you sure you want to delete this post?')) return;
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      })

      const data = await res.json()
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Post deleted Successfully", "success");
      navigate(`${user.username}`)

    } catch (error) {
      console.log("Error in deleting post", error);
      showToast("Error", error.message, "error");

    }
  }


  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    )
  }
  if (!currentPost) return null;

  return (
    <>
      <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
					<Avatar src={user?.profilePic} size={"md"} name='Mark Zuckerberg' />
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{user?.username}
						</Text>
						<Image src='/verified.png' w='4' h={4} ml={4} />
					</Flex>
				</Flex>

        <Flex gap={4} alignItems={"center"}>

          <Text fontSize={"sm"} color={"gray.light"}    >

            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>


          {
            currentUser?._id === user?._id && <DeleteIcon siz={20}
              cursor={"pointer"}

              onClick={handleDeletePost}
            />

          }


        </Flex>


      </Flex>

      <Text my={3}>{currentPost?.text}</Text>

      {
        currentPost.img && (
          <Box borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}

          >
            <Image src={currentPost.img} w={"full"} />

          </Box>
        )
      }


      <Flex gap={3} my={3}>
        <Action post={currentPost} />
      </Flex>


      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        {/* <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"} > Get the app to like , reply and post</Text>
        </Flex>
        <Button>Get</Button> */}
      </Flex>
      {/* <Divider my={8} /> */}

      {
        currentPost.replies.map(reply => (
          <Comment
            key={reply._id}
            reply={reply}
            lastReply={reply._id === currentPost?.replies[currentPost?.replies.length - 1]._id}

          />
        ))
      }





    </>
  )
}

export default PostPage