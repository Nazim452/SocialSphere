import { Button } from "@chakra-ui/button"
import { Box, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from './component/Header'
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./component/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./component/CreatePost"
import postAtom from "./atoms/postsAtom"
import ChatPage from "./pages/ChatPage"
import { SettingsPage } from "./pages/SettingsPage"


function App() {
  const user = useRecoilValue(userAtom);
  // console.log(user);

  const [posts, setPosts] = useRecoilState(postAtom);
  const { pathname } = useLocation();



  return (
    <Box position={'relative'} w={'full'}>


      <Container  maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
        <Header />

        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />




          <Route path="/:username" element={user ?
            (
              <>
                <UserPage />
                <CreatePost />
              </>

            )
            : (
              <>
                <UserPage />

              </>

            )} />



          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
          <Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />


          {/* <Route path="/*" element={"Page Not Found"}/> */}
        </Routes>


        {/* {user && <CreatePost/>} */}

      </Container>
    </Box>
  )
}

export default App

