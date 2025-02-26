"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [error, setError] = useState(null);
	const router = useRouter();

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
		<form onSubmit={handleSubmit}>
			{error && <p className="text-red-500">{error}</p>}
			<label htmlFor="email">Email:</label>
			<input id="email" name="email" type="email" required />
			<label htmlFor="password">Password:</label>
			<input id="password" name="password" type="password" required />
			<button type="submit">Log in</button>
		</form>
	);
}
