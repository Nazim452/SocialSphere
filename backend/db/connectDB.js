
import mongoose from "mongoose";



const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            //to avoid warnings on the console

            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Database connection successfully");

        
    } catch (error) {
        console.log("Error While Connecting Database",error);
        process.exit(1);
        
    }
}

export default connectDB;














