import express from "express";
import { createPost, deletePost, getFeedPost, getPost, getUserPosts, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

//id - postid
router.get("/user/:username",getUserPosts); 
router.get("/feed",protectRoute,getFeedPost);
router.post("/create",protectRoute,createPost);
router.get("/:id",getPost)
router.delete("/:id",protectRoute,deletePost)
router.put("/like/:id",protectRoute,likeUnlikePost)
router.put("/reply/:id",protectRoute,replyToPost)








export default router;

