import express from "express";
import { followUnfollowUser, freezeAccount, getAlluser, getSuggestedUsers, getUserProfile, loginUser, logout, signupUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";



const router = express.Router();

router.get("/profile/:query",getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers);
router.put("/freeze", protectRoute, freezeAccount);
router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logout)
//id of user
router.post("/follow/:id",protectRoute,followUnfollowUser)
router.put("/update/:id",protectRoute,updateUser)
router.get("/" ,getAlluser);


export default router;




















