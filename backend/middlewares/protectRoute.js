import User from "../model/userModel.js";
import  jwt from "jsonwebtoken";
 const protectRoute = async(req,res,next)=>{
    try {

        const token = req.cookies.jwt;  // fetching token form the response of cookies - name we given jwt in generateTokenAndSetCookies;

        if(!token) return res.status(401).json({message:"UnAuthorized"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //cheking in Data Model wether user exist or not
        const user = await User.findById(decoded.userId).select("-password")

        //add user to request
        req.user = user;
        next();
        
    } catch (error) {
        res.status(404).json({message:"Error in Protected Route"})
        console.log("Error in Protected Route: " +error);
        
    }

}

export default protectRoute;















