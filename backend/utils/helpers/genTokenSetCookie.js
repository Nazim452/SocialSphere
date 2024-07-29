import jwt from "jsonwebtoken";

const genTokenSetCookie = (userId, res) => {
	// console.log("Secret"  , process.env.JWT_SECRET);
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: 400 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // CSRF
	});

	return token;
};

export default genTokenSetCookie;
