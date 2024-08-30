import express from "express";
import { followUnfollowUser, forgotPassword, freezeAccount, getAlluser, getSuggestedUsers, getUserProfile, loginUser, logout, resetPassword, signupUser, updateUser, verifyEmail } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";



const router = express.Router();

router.get("/profile/:query",getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers);
router.put("/freeze", protectRoute, freezeAccount);
router.post("/signup",signupUser)
router.post("/verify-email",verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.post("/login",loginUser)
router.post("/logout",logout)
//id of user
router.post("/follow/:id",protectRoute,followUnfollowUser)
router.put("/update/:id",protectRoute,updateUser)
router.get("/" ,getAlluser);


export default router;




















