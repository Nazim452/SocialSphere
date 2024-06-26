import React from 'react'
import { Button, Flex, Image, useColorMode } from '@chakra-ui/react'
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from '../atoms/userAtom';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { IoMdLogOut } from 'react-icons/io';
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom'
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
// import { Link as RouterLink } from "react-router-dom";




const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom)


  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Flex>
          <Link  to={"/"}>
            <AiFillHome size={26} />
          </Link>
        </Flex>
      )}
      {!user && (
        <Flex>
          <Link 
           to={"/auth"} 

            onClick={() => setAuthScreen('login')}


          >
            Login
          </Link>
        </Flex>
      )}


      <Image
        cursor={"pointer"}
        alt='logo'
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}

      />

      {user && (

        <Flex alignItems={"center"} gap={"4"}>
          <Link   to={`${user.username}`}>
            <RxAvatar size={26} />

          </Link>

          <Link  to={`/chat`}>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Link  to={`/settings`}>
						<MdOutlineSettings size={20} />
					</Link>
				

          <Button size={"xs"}
            onClick={logout}

          >
            <IoMdLogOut size={25} />
          </Button>
        </Flex>
      )}



      {!user && (
        <Flex>
          <Link  
          
          
          to={"/auth"}  onClick={() => setAuthScreen('signup')}>
            Signup
          </Link>
        </Flex>
      )}


    </Flex>
  )
}

export default Header