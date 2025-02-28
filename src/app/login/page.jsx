"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
	const [error, setError] = useState(null);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			return router.push("/");
		}
	}, [session]);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");

		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result.error) {
				setError("Invalid Credentials");
			} else {
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			setError("Something went wrong!");
			console.log(error);
		}
	}

	return (
		<div className="h-screen w-screen flex items-center">
			<form
				onSubmit={handleSubmit}
				className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100"
			>
				{error && (
					<p className="text-red-500 font-medium mb-4 p-3 bg-red-50 rounded-lg">
						{error}
					</p>
				)}

				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Welcome Back
				</h2>

				<div className="space-y-4">
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
								placeholder="••••••••"
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
						Log in
					</button>
				</div>

				<div className="mt-4 text-center text-sm text-gray-500">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="text-blue-500 hover:text-blue-600 transition-colors"
					>
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}
