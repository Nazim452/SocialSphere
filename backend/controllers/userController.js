import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import generateTokenAndSetCookies from "../utils/helpers/generateTokenANdSetCookie.js";
import {v2 as cloudinary} from 'cloudinary';
import mongoose from "mongoose";
import Post from "../model/postModel.js";

// export const signupUser = async(req,res)=>{

//     try {

//         const {name,email,username,password} = req.body;

//         const user = await User.findOne({$or:[{email},{username}]});
//         if(user){
//             return res.status(400).json({error:"User Already exists"})

//         }

//         const salt = await bcrypt.genSalt(10);
//         const  hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             name,
//             email,
//             username,
//             password:hashedPassword,

//         })
//         await newUser.save();

//         if(newUser){
//             generateTokenAndSetCookies(newUser._id,res);
//             res.status(201).json({
//                 message:"Successfully user created",
//                 id:newUser._id,
//                 name:newUser.name,
//                 email:newUser.email,
//                 username:newUser.username,
//                 bio:newUser.bio,
//                 profilePic:newUser.profilePic,
//             })
//         }
//         else{
//             res.status(404).json({message:"Invalid user data"})
//         }

        
//     } catch (error) {
//         res.status(500).json({error:error.message})
//         console.log("Error in Signup: " + error);
        
//     }

// }




// export const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Verify username and password are provided
//         if (!username || !password) {
//             return res.status(400).json({ error: "Username and password are required" });
//         }

//         // Find user by username
//         const user = await User.findOne({ username });

//         // Check if user exists
//         if (!user) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         // Compare passwords
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);

//         if (!isPasswordCorrect) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         // Generate token and set cookies
//         generateTokenAndSetCookies(user._id, res);

//         // Respond with user data
//         res.status(200).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             username: user.username,
//             bio: user.bio,
//             profilePic:user.profilePic,
//         });
//     } catch (error) {
//         // Handle any errors
//         console.log("Error in loginUser: ", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



export const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookies(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

export   const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user ) {
            return res.status(400).json({ error: "Invalid username" });

        }

        if(!isPasswordCorrect){
            return res.status(401).json({ error: "Invalid password" });
        }

		if (user.isFrozen) {
			user.isFrozen = false;
			await user.save();
		}

        generateTokenAndSetCookies(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.bio,
			profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};






export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({message:"User logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout: " +error);
        res.status(404).json({message:"Error in logout"})
        
    }
}


export const followUnfollowUser= async(req,res)=>{
    try {
        const{id} = req.params;
        //jo user follow karne ja  raha hai
        const userToModify = await User.findById(id);
        //jisko follow kiyaja rha hai - celebrety
        const currentUser = await User.findById(req.user._id);//  req.user = user; - line 15 in protected route we pass user to req.user

        if(id===req.user._id.toString()) return res.status(400).json({error:"You cannot  follow/Unfollow yourself"});

        if(!userToModify||!currentUser) res.status(404).json({error:"User nt found"});

        const isFollowing = currentUser.following.includes(id);// following me in clude kar arahe hai

        //toggle - if follow then unfollow & vice - versa

        if(isFollowing){
            //unfollow user
            //Modify current user following, modigy followers of userToModify

            //2.celebrety ke followers me se user ko hata rha eh hai
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            
            //1. user jis celebrety ko follow kar rha hai user ke following me se us celebrety ko hata rahe hai
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});

            res.status(200).json({message:"User Unfollowed successfully-hai"})

        }
        else{

            //follow user

            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});
            res.status(200).json({message:"User followed successfully"})




        }
        
    } catch (error) {
        res.status(404).json({error:"Error in followUnfollowUser"})
        console.log("Error in followUnfollowUser: " +error);
        
    }
}


// export const updateUser =async(req,res)=>{
//     const {name,email,username,password,bio} = req.body;
//     let {profilePic} = req.body;

//     const userId = req.user._id;
//     try {

//         let user = await User.findById(userId);
//         if(!user)  res.status(404).json({error:"User not found"})

//         //can't update other user profile
//         //userId is object in protected route  - so we have convert into String
//         if(req.params.id!==userId.toString()) return  res.status(404).json({error:"You can't update other user profile"})

//         if(password){
//             const salt= await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password,salt);
//             user.password = hashedPassword;

//         }
//         if(profilePic){
//             //if already have pic then we deleting prev  pic
//             if(user.profilePic){
//                 //give id for delete
//                 await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
//             }
//             const uploadedResponse = await cloudinary.uploader.upload(profilePic);
//             // uploadedResponse -  return a response
//             profilePic = uploadedResponse.secure_url;
//         }
//         // if name want to update then  name otherwise take previos username.name
//         user.name = name|| user.name;
//         user.email = email||user.email;
//         user.username = username||  user.username;
//         user.profilePic = profilePic||user.profilePic;
//         user.bio = bio||user.bio;

//         user = await user.save();
//         res.status(200).json({message:"Profile update",user});


        
        
//     } catch (error) {
//         res.status(404).json({error:"Error in Update User"})
//         console.log("Error in Update User: " +error);

        
//     }
// }


export const updateUser = async (req, res) => {
	const { name, email, username, password, bio } = req.body;
	let { profilePic } = req.body;

	const userId = req.user._id;
	try {
		let user = await User.findById(userId);
		if (!user) return res.status(400).json({ error: "User not found" });

		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		if (profilePic) {
			if (user.profilePic) {
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		user = await user.save();

		// Find all posts that this user replied and update username and userProfilePic fields
        // agara profile update  hua to jahan  jahan comment kiya  hoga wahan ka reply update ho jayega
		await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		);

		// password should be null in response
		user.password = null;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in updateUser: ", err.message);
	}
};

export const getUserProfile = async (req, res) => {
    //We will fetch user profile either with username or userId -
    // query is either username or userId
    const {query}  = req.params;
    try {
        let user;

        //if query is userId
        if(mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({_id:query}).select("-password").select("-updatedAt")
        }
        //query is username
        else{
             user = await User.findOne({username: query}).select("-password").select("-updatedAt")



        }


        if(!user) return res.status(404).json({error:"User not found"});

        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({error:"Error in Get User Profile",error: error});       
        console.log("Error in Error in Get User Profile: " +error);
        
    }
}



export const getAlluser = async(req,res)=>{
	try {
		
		const  alluser = await User.find({});
	res.status(200).json({alluser});
		
	} catch (error) {
		console.log("Error in Get All User",error);
		res.status(404).json({error:"Error in Get All User",error: error});       

		
	}
}


// export const allUserReply = async(req,res)=>{
// 	try {
// 		const userId = req.user._id;
		
// 		let user = await User.findById(userId);
// 		const allReply = await Post.find(
// 			{ "replies.userId": userId },
// 			{
// 				$set: {
// 					"replies.$[reply].username": user.username,
// 					"replies.$[reply].userProfilePic": user.profilePic,
// 				},
// 			},
// 			{ arrayFilters: [{ "reply.userId": userId }] }
// 		);

// 		res.status(200).send({
// 			message:"All reply fetchded successfully.",
// 			allReply,

// 		})
		
// 	} catch (error) {
// 		console.log("Error in getting all user reply",error);
// 		res.status(404).json({error:"Error in getting all user reply",error: error});       


		
// 	}
// }

export  const getSuggestedUsers = async (req, res) => {
	try {
		// exclude the current user from suggested users array and exclude users that current user is already following
		const userId = req.user._id;

		const usersFollowedByYou = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{
				$sample: { size: 10 },
			},
		]);
		const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export  const freezeAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		user.isFrozen = true;
		await user.save();

		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};












