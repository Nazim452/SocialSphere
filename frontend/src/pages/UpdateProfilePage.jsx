

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,

    Avatar,

    Center,
} from '@chakra-ui/react'
// import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewimg from '../hooks/usePreviewImg'
import useShowToast from '../hooks/useShowToast'

export default function UpdateProfilePage() {

    const [user, setUser] = useRecoilState(userAtom);
    const [updating,setUpdating] = useState(false);


    const { handleImageChange, imgUrl } = usePreviewimg();

    const [input, setInput] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: ""



    })
    // console.log(user);
    const showToast = useShowToast();


    const fileRef = useRef(null);

    // const handleSubmit = async () => {
    //     try {
    //         const res = await fetch(`api/users/update/${user._id}`,{
    //             method: 'PUT',
    //             headers:{
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({...input, profilePic:imgUrl}),//input & image backend me chahiye isliye body me pass karn apar arha hai
    //         })

    //         const data = await res.json();
    //         console.log(data);


    //     } catch (error) {
    //         console.log("Error in handleSubmit", error);
    //         showToast("Error", error, 'error');

    //     }
    // }



    // const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (updating) return;
	// 	setUpdating(true);
	// 	try {
	// 		const res = await fetch(`/api/users/update/${user._id}`, {
	// 			method: "PUT",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ ...input, profilePic: imgUrl }),
	// 		});
	// 		const data = await res.json(); // updated user object

    //         // console.log(data);
	// 		if (data.error) {
	// 			showToast("Error", data.error, "error");
	// 			return;
	// 		}
	// 		showToast("Success", "Profile updated successfully", "success");
    //         //Updated user profile ko  save kar rahe hai loclalStorage me______
	// 		setUser(data);
	// 		localStorage.setItem("user-threads", JSON.stringify(data));
	// 	} catch (error) {
	// 		showToast("Error", error.message, "error");
	// 	} 
    //     finally {
	// 		setUpdating(false);
	// 	}
	// };


    const handleSubmit = async (e) => {
		e.preventDefault();
		if (updating) return;
		setUpdating(true);
		try {
			const res = await fetch(`/api/users/update/${user._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...input, profilePic: imgUrl }),
			});
			const data = await res.json(); // updated user object
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Profile updated successfully", "success");
			setUser(data);
			localStorage.setItem("user-threads", JSON.stringify(data));
		} catch (error) {
            console.log("Error in UpdateProfile", error);
			showToast("Error", "Something went Wrong", "error");
		} finally {
			setUpdating(false); 
		}
	};



    return (
        <form onSubmit={handleSubmit}>
            <Flex
                my={6}

                align={'center'}
                justify={'center'}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">

                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imgUrl || user?.profilePic} />
                               
                            </Center>
                            <Center w="full">
                                <Button onClick={() => fileRef.current.click()} w="full">Change Avatar</Button>
                                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl >
                        <FormLabel>Full name</FormLabel>
                        <Input
                            value={input.name}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                            placeholder="Md Nazim"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>User name</FormLabel>
                        <Input
                            value={input.username}
                            onChange={(e) => setInput({ ...input, username: e.target.value })}
                            placeholder="nazim452"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Email address</FormLabel>
                        <Input

                            value={input.email}
                            onChange={(e) => setInput({ ...input, email: e.target.value })}



                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Bio</FormLabel>
                        <Input

                            value={input.bio}
                            onChange={(e) => setInput({ ...input, bio: e.target.value })}

                            placeholder="Your bio...."
                            _placeholder={{ color: 'gray.500' }}
                            
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Password</FormLabel>
                        <Input

                            value={input.password}
                            onChange={(e) => setInput({ ...input, password: e.target.value })}
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                        isLoading = {updating}

                        type='submit'


                            bg={'green.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.500',
                            }}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}