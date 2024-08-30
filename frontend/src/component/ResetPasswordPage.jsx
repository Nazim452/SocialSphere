import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import useShowToast from '../hooks/useShowToast';

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const[loading ,setLoading] = useState(false);
	const { token } = useParams();
	const navigate = useNavigate();
	const showToast = useShowToast();

	
	
	const resetPassword = async(token, password)=>{
		try {
			const response = await axios.post(`/api/users/reset-password/${token}`, { password });
			console.log("Response of reset password " + response);
			
			
		} catch (error) {

			console.log("Error in reset password", error);
			

			
		}
	}



	const handleSubmit =  (e) => {
		e.preventDefault();

		setLoading(true);

		if (password !== confirmPassword) {
			showToast("Error", "Password don't match", "error");

			return;
		}
		try {
			 resetPassword(token, password);

			 showToast("Success", "Password reset successfully, redirecting to login page...", "success");

			setTimeout(() => {
				navigate("/auth");
			}, 2000);

			setLoading(false)
		} catch (error) {
			console.error(error);
			showToast("Error", error?.message||"Something went wrong", "error");

			setLoading(false)

			
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>
				{/* {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>} */}

				<form onSubmit={handleSubmit}>
					<Input
					
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
					
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={loading}
					>
						{loading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};
export default ResetPasswordPage;
