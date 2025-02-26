"use client";

import axios from "axios";

export default function RegisterPage() {
	async function handleSignUp(e) {
		e.preventDefault();

		const formData = {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};

		console.log(formData);

		try {
			const response = await axios.post("/api/auth/register", formData);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form onSubmit={handleSignUp}>
			<label htmlFor="username">Username:</label>
			<input id="username" name="username" type="text" required />
			<label htmlFor="email">Email:</label>
			<input id="email" name="email" type="email" required />
			<label htmlFor="password">Password:</label>
			<input id="password" name="password" type="password" required />
			<button type="submit">Sign up</button>
		</form>
	);
}
