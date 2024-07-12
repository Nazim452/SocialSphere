import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import Post from '../component/Post'
import { useRecoilState } from 'recoil'
import postAtom from '../atoms/postsAtom'
import AllUser from '../component/AllUser'
import SuggestedUsers from '../component/SuggestedUsers'


const HomePage = () => {

  const showToast = useShowToast();
  //all Post getting  on home page
  const [posts, setposts] = useRecoilState(postAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getFeed = async () => {
      setLoading(true);
      setposts([]);
      try {

        const res = await fetch('/api/posts/feed');

        const data = await res.json();
        // console.log(data);
        setposts(data);

      } catch (error) {
        console.log("Error in getting Feed", error);
        showToast("Error", error.message, "error");

      }
      finally {
        setLoading(false);
      }
    }



    getFeed();

  }, [showToast, setposts]);




  return (

    <>

    <Box
    display={{
      base: "block",
      md: "none",
    }}
    
    >

    <AllUser/>

    </Box>
    
    
    <Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

				{posts?.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
			</Box>
			<Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers  />
			</Box>
		</Flex>
    
    
    </>
  



  )
}

export default HomePage