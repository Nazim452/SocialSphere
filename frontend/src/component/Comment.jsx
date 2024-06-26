import { Avatar, Flex, Text, Divider } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import Action from './Action';
const Comment = ({reply,lastReply}) => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{reply?.username}</Text>
                        
                    </Flex>


                    <Text>{reply?.text}</Text>
                    

                    {/* If We want to add likes in comment the add YourSelf */}
                    {/* <Action liked={liked} setLiked={setLiked} />

                    <Text fontSize={"sm"} color={"gray.light"}>
                        {likes + (liked ? 1 : 0)} likes
                    </Text> */}



                </Flex>
            </Flex>

          {
            !lastReply?   <Divider my={4} />:null
          }

        </>
    )
}

export default Comment