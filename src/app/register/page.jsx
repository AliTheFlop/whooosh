"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
	const { data: session, status } = useSession();
	const [errorMessage, setErrorMessage] = useState(null);

	const router = useRouter();

	useEffect(() => {
		if (session) {
			return router.push("/");
		}
	}, [session]);

	async function handleSignUp(e) {
		e.preventDefault();

		const formData = {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};

		try {
			await axios.post("/api/auth/register", formData);
		} catch (error) {
			setErrorMessage(error.response.data.error);
		}
	}

	return (
		<div className="h-screen w-screen flex items-center">
			<form
				onSubmit={handleSignUp}
				className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100"
			>
				{errorMessage && (
					<p className="text-red-500 font-medium mb-4 p-3 bg-red-50 rounded-lg">
						{errorMessage}
					</p>
				)}
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Create Your Account
				</h2>

				<div className="space-y-4">
					<div className="space-y-2">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<div className="relative">
							<input
								id="username"
								name="username"
								type="text"
								required
								className="w-full h-12 pl-4 rounded-lg
					bg-gray-50
					border border-gray-200
					text-gray-800
					placeholder-gray-400
					focus:border-blue-500
					focus:ring-1 focus:ring-blue-500
					focus:outline-none
					transition-colors"
								placeholder="johndoe"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<div className="relative">
							<input
								id="email"
								name="email"
								type="email"
								required
								className="w-full h-12 pl-4 rounded-lg
					bg-gray-50
					border border-gray-200
					text-gray-800
					placeholder-gray-400
					focus:border-blue-500
					focus:ring-1 focus:ring-blue-500
					focus:outline-none
					transition-colors"
								placeholder="you@example.com"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								name="password"
								type="password"
								required
								className="w-full h-12 pl-4 rounded-lg
					bg-gray-50
					border border-gray-200
					text-gray-800
					placeholder-gray-400
					focus:border-blue-500
					focus:ring-1 focus:ring-blue-500
					focus:outline-none
					transition-colors"
								placeholder="Choose a strong password"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<button
						type="submit"
						className="w-full h-12 flex justify-center items-center
				bg-blue-500 hover:bg-blue-600
				text-white font-medium
				rounded-lg
				transition-colors duration-200 ease-in-out
				focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
					>
						Sign up
					</button>
				</div>

				<div className="mt-4 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-blue-500 hover:text-blue-600 transition-colors"
					>
						Log in
					</Link>
				</div>
			</form>
		</div>
	);
}
