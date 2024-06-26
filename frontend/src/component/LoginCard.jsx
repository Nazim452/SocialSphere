
// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   HStack,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Link,
// } from '@chakra-ui/react'
// import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
// import { useSetRecoilState } from 'recoil'
// import authScreenAtom from '../atoms/authAtom'
// import useShowToast from '../hooks/useShowToast'
// import userAtom from '../atoms/userAtom'

// export default function LoginCard() {

//   const showToast = useShowToast();
//   const setUser =useSetRecoilState(userAtom); 

//   const [input, setInput] = useState({
//     username: "",
//     password: "",
//   })
  
//   const [showPassword, setShowPassword] = useState(false)
//   const setAuthScreen = useSetRecoilState(authScreenAtom)


//   // const handleLogin = async () => {

//   //   try {

//   //     const res = await fetch("/api/users/login",{
//   //       method: 'POST',
//   //       headers:{
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(input)
//   //     })

//   //     const data = await res.json();
//   //     console.log(data);

//   //     if(data.error) {
//   //       showToast("Error", error,"error");
//   //       return;

//   //     }

//   //     // set cookies in local storage
//   //     console.log(data);
//   //     localStorage.setItem("user-threads",JSON.stringify(data));
//   //     setUser(data);



//   //   } catch (error) {
//   //     // console.log("Error Diuring Login", error);
//   //     showToast("Error", "Invalid user name or pasword","error")

//   //   }

//   // }

// 	// const handleLogin = async () => {
	
// 	// 	try {
// 	// 		const res = await fetch("/api/users/login", {
// 	// 			method: "POST",
// 	// 			headers: {
// 	// 				"Content-Type": "application/json",
// 	// 			},
// 	// 			body: JSON.stringify(input),
// 	// 		});
// 	// 		const data = await res.json();
// 	// 		if (data.error) {
// 	// 			showToast("Error", "Incorrect username or password", "error");
// 	// 			return;
// 	// 		}
// 	// 		localStorage.setItem("user-threads", JSON.stringify(data));
// 	// 		setUser(data);
// 	// 	} catch (error) {
// 	// 		showToast("Error", error, "error");
// 	// 	} 
// 	// };
//   //GPT

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(input),
//       });
//       const data = await res.json();
//       if (data.error) {
//         showToast("Error", data.error, "error"); // Use data.error instead of just error
//         return;
//       }
//       localStorage.setItem("user-threads", JSON.stringify(data));
//       setUser(data);
//     } catch (error) {
//       showToast("Error", error.message, "error"); // Use error.message to display the error message
//     }
//   };
  



//   return (
//     <Flex

//       align={'center'}
//       justify={'center'}
//     >
//       <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//         <Stack align={'center'}>
//           <Heading fontSize={'4xl'} textAlign={'center'}>
//             Login
//           </Heading>

//         </Stack>
//         <Box
//           rounded={'lg'}
//           bg={useColorModeValue('white', 'gray.dark')}
//           boxShadow={'lg'}
//           p={8}
//           w={{
//             base: "full",
//             sm: "400px"      // for above 400px size 400px
//           }}

//         >
//           <Stack spacing={4}>

//             <FormControl isRequired>
//               <FormLabel>Username</FormLabel>
//               <Input

//                 value={input.username}
//                 onChange={(e) => setInput((input) => ({ ...input, username: e.target.value }))}

//                 type="text" />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Password</FormLabel>
//               <InputGroup>
//                 <Input


//                   value={input.password}
//                   onChange={(e) => setInput((input) => ({ ...input, password: e.target.value }))}



//                   type={showPassword ? 'text' : 'password'} />
//                 <InputRightElement h={'full'}>
//                   <Button
//                     variant={'ghost'}
//                     onClick={() => setShowPassword((showPassword) => !showPassword)}>
//                     {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>
//             <Stack spacing={10} pt={2}>
//               <Button

//                 onClick={handleLogin}



//                 loadingText="Submitting"
//                 size="lg"
//                 bg={useColorModeValue("gray.600", "gray.700")}
//                 color={'white'}
//                 _hover={{
//                   bg: useColorModeValue("gray.600", "gray.700")
//                 }}>
//                 Login
//               </Button>
//             </Stack>
//             <Stack pt={6}>
//               <Text
//                 onClick={() => setAuthScreen("signup")}


//                 align={'center'}>
//                 Don't have an account <Link
//                   color={'blue.400'}>Sign up</Link>
//               </Text>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   )
// }




























import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function LoginCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
      console.log(inputs);
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
      console.log(data);
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", "Something Went wrong", "error");
		} 

		finally{
			setLoading(false);
		}
	};
	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					p={8}
					w={{
						base: "full",
						sm: "400px",
					}}
				>
					<Stack spacing={4}>
						<FormControl isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								value={inputs.username}
								onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									value={inputs.password}
									onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Logging in'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleLogin}
								isLoading={loading}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}




