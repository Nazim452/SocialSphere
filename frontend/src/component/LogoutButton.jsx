import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from "../atoms/userAtom";
import useShowToast from '../hooks/useShowToast';
import { IoMdLogOut } from "react-icons/io";


const LogoutButton = () => {


  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async () => {

    try {
      //fetch

      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json();
      // console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      setUser(null);
      localStorage.removeItem("user-threads");


    } catch (error) {
      console.log("Error in handle logOut", error);
      showToast("Error", "Something went wrong", "error");
    }
  }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"}

      onClick={handleLogout}


    >
      <IoMdLogOut  size={25}/>


    </Button>
  )
}

export default LogoutButton