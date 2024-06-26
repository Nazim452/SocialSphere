


import React, { useEffect, useState } from 'react';
import { ListItem, ListIcon, List, Avatar, Box, Button, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const AllUser = () => {
    const [users, setUsers] = useState({ alluser: [] });







    const fetchAllUsers = async () => {
        try {
            const res = await fetch("/api/users", {
                method: 'GET',
            });

            const data = await res.json();
            // console.log("All user list", data);

            setUsers(data);
        } catch (error) {
            console.log("Error in getting all users", error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            <Box fontSize={'25px'} marginBottom={'5px'}>
                <h1>People You May Know</h1>
            </Box>
            <ul>
                {/* {users.alluser.map(user => (
          <li key={user._id}>{user.name}</li>
        ))} */}
                {users.alluser.map(user => (
                    <List display={'inline-block'} gap={''} marginTop={'10px'}  margin={'10px'} 
                   
                        key={user._id}
                    >
                        <ListItem fontSize={'md'}>
                            

                            <Link to={`${user.username}`}>
                                <Avatar
                                   display={'flex'}
                                   alignItems={'center'}
                                   justifyContent={'center'}

                                    boxSize='50px'
                                    gap={'20px'}
                                    objectFit='cover'
                                    name={user?.name}

                                    src={user?.profilePic}


                                    size={{
                                        base: "sm",
                                        sm: "md"
                                    }}

                                />

                              

                                  
                                        {user.name} &nbsp; &nbsp;
                                      <Text>
                                      Followers- 
                                {user?.followers.length}&nbsp;
                                      </Text>
                               
                                   



                              

                            </Link>
                            &nbsp; &nbsp;




                            {/* <Box ><Text>
                                Followers - &nbsp;
                                {user?.followers.length}
                               
                                &nbsp; |    {user?.bio && user?.bio.substring(0, 43)}...</Text>

                                <Text fontSize={{
                                    base: "xs",
                                    md: "sm",
                                    lg: "md"
                                }}></Text>
                            </Box> */}

                            {/* <Box border='1px' borderColor='gray.100' height={'3px'} marginBottom={'7px'} marginTop={'7px'}>

                            </Box> */}



                        </ListItem>
                    

                    </List>
                   
                ))}



            </ul>
        </div>
    );
}

export default AllUser;
