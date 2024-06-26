// import React, { useRef, useState } from 'react'
// import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, ModalBody, FormControl, Textarea, Text, Input, Flex, Image, CloseButton } from '@chakra-ui/react'
// import { AddIcon } from '@chakra-ui/icons'
// import usePreviewimg from '../hooks/usePreviewimg';
// import { BsFillImageFill } from 'react-icons/bs';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import userAtom from '../atoms/userAtom';
// import useShowToast from '../hooks/useShowToast';
// import postAtom from '../atoms/postsAtom';
// import { useParams } from 'react-router-dom';



// const MAX_CHAR = 500;
// const CreatePost = () => {

//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [postText, setPostText] = useState('');
//     const { handleImageChange, imgUrl, setImgUrl } = usePreviewimg();
//     const [remainnigChar, setRemainingChar] = useState(MAX_CHAR);
//     const user = useRecoilValue(userAtom);
//     const shoeToast = useShowToast();
//     const [loading,setLoading] = useState(false);
//     const[posts, setPosts] = useRecoilState(postAtom);
//     const {username} = useParams();

//     const imgRef = useRef(null);

//     const handleTextChange = (e) => {
//         const inputText = e.target.value;

//         if (inputText.length > MAX_CHAR) {
//             const truncatedText = inputText.slice(0, MAX_CHAR);
//             setPostText(truncatedText);
//             setRemainingChar(0);
//         }
//         else {
//             setPostText(inputText);
//             setRemainingChar(MAX_CHAR - inputText.length)
//         }



//     }
//     const handleCreatePost = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("/api/posts/create", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
    
//                 },
//                 // ye 3 chiz controller request ke body se lena hai
//                 body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
//             })
    
//             const data =await res.json();
//             if(data.error){
//                 shoeToast("Error",data.error,"error")
//                 return;
//             }
    
//             shoeToast("Success","Post created successfully", "success")
//             onClose();
//             setPostText("")
//             setImgUrl("")
//             //updaing gloabl post atom for immediately rendering on UI - current post & prev one
//             // if Our profile page then only add inpost
//             setPosts([data, ...posts])
           
    
            
//         } catch (error) {
//             console.log("Error in CreatePost",error);
//             shoeToast("Error","SOmething went wrong","error")

            
//         }
//         finally{
//             setLoading(false);
//         }

   
//     }

//     return (
//         <>

//             <Button

//                 position={"fixed"}
//                 bottom={10}
//                 right={5}
//                 leftIcon=  {<AddIcon />}
//                 onClick={onOpen}
//                 // size={"sm"}
                // size={{
                //     base:"sm",
                //     sm:"md"
                // }}

//                 bg={useColorModeValue("gray.300", "gray.dark")}

//             >
//                 Post
             

//             </Button>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Create Post</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>


//                         <FormControl>
//                             <Textarea

//                                 placeholder='Post content goes here'
//                                 onChange={handleTextChange}
//                                 value={postText}


//                             />
//                             <Text fontSize="xs"
//                                 fontWeight={"bold"}
//                                 textAlign={"right"}
//                                 m={"1"}
//                                 color={"gray.300"}
//                             >
//                                 {remainnigChar}/{MAX_CHAR}
//                             </Text>


//                             <Input

//                                 type='file'
//                                 hidden
//                                 ref={imgRef}
//                                 onChange={handleImageChange}

//                             />
//                             <BsFillImageFill
//                                 style={{ marginLeft: "5px", cursor: "pointer" }}

//                                 size={16}
//                                 onClick={() => imgRef.current.click()}
//                             />
//                         </FormControl>

//                         {imgUrl && (
//                             <Flex mt={5} w={"full"} position={"relative"}>

//                                 <Image src={imgUrl} alt='Selected Image' />

//                                 <CloseButton
//                                     onClick={() => {
//                                         setImgUrl("")
//                                     }}
//                                     bg={"gray.800"}
//                                     position={'absolute'}
//                                     top={2}
//                                     right={2}


//                                 />

//                             </Flex>
//                         )}



//                     </ModalBody>

//                     <ModalFooter>
//                         <Button
//                         isLoading={loading}
                        
//                         colorScheme='blue' mr={3} onClick={handleCreatePost}>
//                             Post
//                         </Button>
//                         {/* <Button variant='ghost'>Secondary Action</Button> */}
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>

//         </>
//     )
// }

// export default CreatePost



























import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

// import usePreviewimg from "../hooks/usePreviewimg";
import usePreviewimg from '../hooks/usePreviewImg';

import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [postText, setPostText] = useState("");
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewimg();
	const imageRef = useRef(null);
	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
	const user = useRecoilValue(userAtom);
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useRecoilState(postsAtom);
	const { username } = useParams();

	const handleTextChange = (e) => {
		const inputText = e.target.value;

		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setPostText(truncatedText);
			setRemainingChar(0);
		} else {
			setPostText(inputText);
			setRemainingChar(MAX_CHAR - inputText.length);
		}
	};

	const handleCreatePost = async () => {
		setLoading(true);
		try {

			console.log("user in created Post",user);
			

            if ( !user?._id) {
                showToast("Error", "User ID not available", "error");
                return;
            }


			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user?._id, text: postText, img: imgUrl }),
			});

			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post created successfully", "success");
			if (username === user.username) {
				setPosts([data, ...posts]);
			}
			onClose();
			setPostText("");
			setImgUrl("");
			window.location.reload();
		}
		
		catch (error) {
			showToast("Error", error, "error");

		} 
		
		finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				position={"fixed"}
				bottom={10}
				right={5}
				bg={useColorModeValue("gray.300", "gray.dark")}
				onClick={onOpen}
				size={{ base: "sm", sm: "md" }}
			>
				<AddIcon />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Textarea
								placeholder='Post content goes here..'
								onChange={handleTextChange}
								value={postText}
							/>
							<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.200"}>
								{remainingChar}/{MAX_CHAR}
							</Text>

							<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

							<BsFillImageFill
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={16}
								onClick={() => imageRef.current.click()}
							/>
						</FormControl>

						{imgUrl && (
							<Flex mt={5} w={"full"} position={"relative"}>
								<Image src={imgUrl} alt='Selected img' />
								<CloseButton
									onClick={() => {
										setImgUrl("");
									}}
									bg={"gray.800"}
									position={"absolute"}
									top={2}
									right={2}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
