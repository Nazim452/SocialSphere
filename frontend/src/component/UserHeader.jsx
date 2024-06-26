import { Box, VStack, Flex, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Avatar } from "@chakra-ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { Button, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from '@chakra-ui/react'
import userAtom from '../atoms/userAtom'
import { useRecoilValue } from "recoil"
import { Link } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'



const UserHeader = ({user}) => {

  const toast = useToast();
  const currentUser = useRecoilValue(userAtom)//logged in user
  // user.followers.includes(currentUser._id) is an expression that checks if the currentUser._id exists in the followers array of the user object.
  const [following,setFollowing] = useState(user.followers.includes(currentUser?._id));
  console.log(following);
  const [updating,setUpdating] = useState(false);

  const showToast = useShowToast();




  const copyURL = () => {
    const currURL = window.location.href;
    navigator.clipboard.writeText(currURL).then(() => {
      toast({
        title: 'Copied Link.',
        description: "Profile Link copied to clipboard",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    })
  }

  const handleFollow =async ()=>{

    if(!currentUser){
      showToast("Error" ,"Please login to follow" ,"error");
      return;

    }
    if(updating) return;
    setUpdating(true);
    try {

      const res = await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();

      if(data.error){
        showToast("Error" ,data.error ,"error");
        return;


      }

      if(following){
        showToast("Success", `Unfollowed ${user.name}`,"success");
        user.followers.pop();  //simulate removing followers
      }
      else{
        showToast("Success", `followed ${user.name}`,"success");
        user.followers.push(currentUser?._id)


      }
      setFollowing(!following)
      // console.log(data);


      
    } catch (error) {
      console.log("Error in handleFollow",error);
      showToast("Error" ,data.error ,"error");

      
    }
    //always either in success or error setUpdating make false
    finally{
      setUpdating(false);
    }

  }



  return (
    <VStack gap={4} alignItems={"start"}>

      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>{user.name}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
              <Text fontSize={{
                base:"xs",
                md:"sm",
                lg:"md"
              }} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.next</Text>

          </Flex>
        </Box>

        <Box>
        {user.profilePic &&(
            <Avatar name={user.name} src={user.profilePic} size={
              {
                base:"md",
                md:"xl"
              }
            } />
        )}
        {!user.profilePic &&(
            <Avatar name={user.name} src='https://bit.ly/broken-link' size={
              {
                base:"md",
                md:"xl"
              }
            } />
        )}

        </Box>

      </Flex>

      <Text>{user.bio}</Text>


      {
        currentUser?._id===user._id&&(
          <Link to='/update'>
            <Button size={"sm"}>Update Profile</Button>
          </Link>
        )
      }
      {
        currentUser?._id!==user._id&&(
      
            <Button 
           isLoading={updating}
            size={"sm"}

            onClick={handleFollow}
            
            
            >
              {following ?"Unfollow":"Follow"}
            </Button>
         
        )
      }


      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>Followers {user.followers.length}</Text>
          <Text color={"gray.light"}>Following {user.following.length}</Text>
          <Box w="1" j="1" bg={"gray.light"} borderRadius={"full"}></Box>
          {/* <Link color={"gray.light"}>instagram.com</Link> */}
        </Flex>

        <Flex>
          <Box className='icon-container'>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className='icon-container'>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}> Copy Link</MenuItem>
                </MenuList>

              </Portal>
            </Menu>
          </Box>

        </Flex>

      </Flex>

      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>Your Posts</Text>

        </Flex>
        {/* <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>Replies</Text>

        </Flex> */}


      </Flex>



    </VStack>
  )
}

export default UserHeader