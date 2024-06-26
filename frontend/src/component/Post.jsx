// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Box, Flex, Text } from '@chakra-ui/layout'
// import { Avatar } from '@chakra-ui/avatar'
// import { Image } from '@chakra-ui/react'
// // import { BsThreads, BsThreeDots } from 'react-icons/bs'
// import Action from './Action'
// import useShowToast from '../hooks/useShowToast'
// import{formatDistanceToNow} from 'date-fns'
// import {DeleteIcon} from '@chakra-ui/icons'
// import { useRecoilState, useRecoilValue } from "recoil"
// import userAtom from '../atoms/userAtom'
// import postAtom from '../atoms/postsAtom'


// const Post = ({ post, postedBy }) => {

//     const showToast = useShowToast();
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const currentUser = useRecoilValue(userAtom);
//     const [posts,setPosts] = useRecoilState(postAtom)




//     useEffect(() => {

//         //fetching user profile-----------------------------------------------------------------

//         //postedBy - user id is mentioned in postedBy those poster
//         const getUser = async () => {
//             try {
//                 const res = await fetch("/api/users/profile/" + postedBy);
//                 const data = await res.json();
//                 // console.log(data);

//                 if (data.error) {
//                     showToast("Error", data.error, "error");
//                 }
//                 setUser(data);

//             } catch (error) {
//                 showToast("Error", error.message, "error");
//                 // setUser(null);


//             }
//         }
//         getUser();

//     }, [])



//     const handleDeletePost = async(e)=>{
//         try {
//             e.preventDefault();
//             if(!window.confirm('Are you sure you want to delete this post?')) return ;
//             const res = await fetch(`/api/posts/${post._id}`,{
//                 method:"DELETE",
//             })

//             const data= await res.json()
//             // console.log(data);
//             if(data.error){
//                 showToast("Error", data.error, "error");
//                 return;
//             }

//             showToast("Success", "Post deleted Successfully", "success");
//             // Deleted element filter & sucddenly reflect on UI. No Need to Refresh-----
//             // setPosts((prev)=>prev.filter((p)=>p._id!==post._id));
//             setPosts(posts.filter((p)=>p._id!==post?._id));

//         } catch (error) {
//             console.log("Error in deleting post", error);
//             showToast("Error", error.message,"error");

//         }
//     }













//     return (


//         <Link to={`/${user?.username}/post/${post?._id}`}>

//             <Flex gap={3} mb={4} py={5}>
//                 <Flex flexDirection={"column"} alignItems={"center"}>
//                     <Avatar

//                         onClick={(e) => {
//                             e.preventDefault();
//                             navigate(`${user?.username}`)

//                         }}

//                         size="md" name={user?.name} src={user?.profilePic} />
//                     <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
//                     <Box position={'relative'} w={"full"}>

//                         {post.replies?.length === 0 && <Text fontSize={30} textAlign={"center"}>😔</Text>}

//                         {
//                             post?.replies[0] && (
//                                 <Avatar
//                                     size="xs"
//                                     name='John doe'
//                                     src={post?.replies[0].userProfilePic}
//                                     position={"absolute"}
//                                     top={"0px"}
//                                     left={"15px"}
//                                     padding={"2px"}
//                                 />
//                             )
//                         }
//                         {
//                             post?.replies[1] && (
//                                 <Avatar
//                                     size="xs"
//                                     name='John doe'
//                                     src={post?.replies[1].userProfilePic}
//                                     position={"absolute"}
//                                     bottom={"0px"}
//                                     right="-5px"
//                                     padding={"2px"}
//                                 />
//                             )

//                         }
//                         {
//                             post?.replies[3] && (
//                                 <Avatar
//                                     size="xs"
//                                     name='John doe'
//                                     src={post?.replies[2].userProfilePic}
//                                     position={"absolute"}
//                                     bottom={"0px"}
//                                     left={"4px"}
//                                     padding={"2px"}
//                                 />

//                             )
//                         }

//                     </Box>
//                 </Flex>

//                 <Flex flex={1} flexDirection={"column"} gap={2}>
//                     <Flex justifyContent={'space-between'} w={"full"}>
//                         <Flex w={"full"} alignItems={"center"}>
//                             <Text

//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     navigate(`${user?.username}`)

//                                 }}



//                                 fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
//                             <Image src='/verified.png' w={4} h={4} ml={1}></Image>
//                         </Flex>
//                         <Flex gap={4} alignItems={"center"}>

//                             <Text fontSize={"sm"} color={"gray.light"}    >

//                                 {formatDistanceToNow(new Date(post?.createdAt))} ago
//                             </Text>


//                            {
//                             currentUser?._id===user?._id  &&  <DeleteIcon siz={20}

//                             onClick={handleDeletePost}
//                             />

//                            }


//                         </Flex>
//                     </Flex>

//                     <Text fontSize={"sm"}>{post?.text}</Text>
//                     {post?.img && (
//                         <Box borderRadius={6}
//                             overflow={"hidden"}
//                             border={"1px solid"}
//                             borderColor={"gray.light"}

//                         >
//                             <Image src={post?.img} w={"full"} />

//                         </Box>
//                     )}

//                     <Flex gap={3} my={1}>
//                         <Action post={post}  />
//                     </Flex>


//                 </Flex>

//             </Flex>


//         </Link>
//     )
// }

// export default Post













import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Action";
import { useEffect, useState } from "react";
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const Post = ({ post, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);
            }
        };

        getUser();
    }, [postedBy, showToast]);

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Post deleted", "success");
            setPosts(posts.filter((p) => p._id !== post._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;
    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size='md'
                        name={user.name}
                        src={user?.profilePic}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}
                    />
                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
                        {post.replies[0] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[0].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        )}

                        {post.replies[1] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                right='-5px'
                                padding={"2px"}
                            />
                        )}

                        {post.replies[2] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                left='4px'
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}
                            >
                                {user?.username}
                            </Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign= {"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
							</Text>
                            {/* <Text fontSize={"sm"} color={"gray.light"}    >
                                {post && post.createdAt && formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text> */}

                            {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
