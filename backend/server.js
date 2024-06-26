import path from "path";
import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
connectDB();
// const app = express();

import {app,server} from './socket/socket.js'

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// Connected with cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Allows to pass incoming data from the request body
app.use(express.json({ limit: '50mb' })); // Set the limit as per your requirement
app.use(express.urlencoded({ extended:true})); // To Parse form data in the request body

// Help to get cookie & set the cookie inside the response
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// http://localhost:5000 => backend , fronted make same URL to not gate cors error
// Following code doing  running on same port


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));




