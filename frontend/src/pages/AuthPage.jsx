import{useRecoilValue} from "recoil"
import React from 'react'
import SignupCard from '../component/SignupCard'
import LoginCard from '../component/LoginCard'
import authScreenAtom from '../atoms/authAtom'

const AuthPage = () => {

    //like that useState

    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState);

  return (
    <div>
       {authScreenState==="login"? <LoginCard/> :<SignupCard/>}
    </div>
  )
}

export default AuthPage







