import User from "../model/userModel.js";
import Post from "../model/postModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;

        if (!postedBy || !text) return res.status(404).json({ error: "PostedBy & text filed is required" });


        //jo post karna chhata hai uski id nikalo
        const user = await User.findById(postedBy);

        if (!user) return res.status(404).json({ error: "User not found" });
        // koi kisi dusre ke id se post nahi karega
        if (user._id.toString() !== req.user._id.toString()) return res.status(404).json({ message: "Unauthorized creating post" });


        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;


        }




        const maxLength = 500;
        if (text.length > maxLength) return res.status(404).json({ error: `Text must be less than ${maxLength} characters` });

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();
        return res.status(201).json(newPost);




    } catch (error) {
        console.log("error creating post", error);
        res.status(404).json({ error: "Error in CreatePost" })

    }

}

// export const createPost = async (req, res) => {
// 	try {
// 		const { postedBy, text } = req.body;
//         console.log("Request body of post", req.body);
// 		let { img } = req.body;

// 		if (!postedBy ) {
// 			return res.status(400).json({ error: "Postedby  are required" });
// 		}

//         if(!text){
//             return res.status(400).json({ error: "Text  are required" });

//         }

// 		const user = await User.findById(postedBy);
// 		// if (!user) {
// 		// 	return res.status(404).json({ error: "User not found" });
// 		// }

// 		if (user._id.toString() !== req.user._id.toString()) {
// 			return res.status(401).json({ error: "Unauthorized to create post" });
// 		}

// 		const maxLength = 500;
// 		if (text.length > maxLength) {
// 			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
// 		}

// 		if (img) {
// 			const uploadedResponse = await cloudinary.uploader.upload(img);
// 			img = uploadedResponse.secure_url;
// 		}

// 		const newPost = new Post({ postedBy, text, img });
// 		await newPost.save();

// 		res.status(201).json({newPost});
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log(err);
// 	}
// };
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ error: "Post not found" });


        res.status(200).json(post);


    } catch (error) {
        console.log("error getting post", error);
        res.status(404).json({ error: "Error in get post", error })

    }
}



export const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        // jo postkiya hai wahi sirf delete kar sakta hai

        if (post.postedBy.toString() !== req.user._id.toString()) return res.status(404).json({ message: "Unauthorized to delete this post" });
     // deleting post image from cloudinary
        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });


    } catch (error) {
        console.log("Error in delete post", error);
        res.status(404).json({ error: "Error in delete post" })

    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        //now this id converted  into postId
        const { id: postId } = req.params;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });
        //jo like kiya uske id ko like array me include kar dena hai
        const userLikePost = post.likes.includes(userId);

        if (userLikePost) {
            //unlike post
            //post model me is postId ko likes array se pull(delete) kar dena hai
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.status(200).json({ message: "Post unlike successfully" });


        }
        else {
            //like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post Liked successfully " });

        }

    } catch (error) {
        console.log("Error in LikeUnlike Post", error);
        res.status(404).json({ error: "Error in LikeUnlike Post " })

    }
}


export const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;  //or = const{id:postId} = req.params
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) return res.status(404).json({ error: "Text is required" });
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });
        //kon sa username wala kon se text, kon se pic ke sath reply kar raha hai

        const reply = { userId, text, userProfilePic, username };

        post.replies.push(reply);
        await post.save();

        res.status(200).json(reply);

    } catch (error) {
        console.log("Error in replyToPost", error);
        res.status(404).json({ error: "Error in replyToPost", error });

    }
}


//getFeedPost - User jise follow kar raha hai - uske hi sare post ko fetch karna
export const getFeedPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const following = user.following; //find the following of the user
        const feedPost = await Post.find({ postedBy: { $in: following } });
        res.status(200).json(feedPost);

    } catch (error) {
        console.log("Error in getFeedPost", error);

        res.status(404).json({ error: "Error in getFeedPost", error });

    }
}


export const getUserPosts = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ error: 'User not found' });
        const posts = await Post.find({postedBy: user._id}).sort({ createdAt: -1 });
        res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getUserPosts", error);
        res.status(500).json({ error: error.message })

    }
}


