import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

// Ensure connection is ready
const connectDb = async () => {
	try {
		await client.connect();
		return client;
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
		throw error;
	}
};

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					await connectDb();
					const db = client.db("Whooosh");
					const users = db.collection("users");

					// Find the user
					const user = await users.findOne({
						email: credentials.email,
					});

					if (!user) {
						return null;
					}

					// Compare passwords using bcrypt
					const passwordMatch = await bcrypt.compare(
						credentials.password,
						user.hashedPassword
					);

					if (passwordMatch) {
						// Return user object (without sensitive data)
						return {
							id: user._id.toString(),
							email: user.email,
							name:
								user.name ||
								user.username ||
								user.email.split("@")[0],
						};
					}

					return null;
				} catch (error) {
					console.error("Authentication error:", error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			// Add user info to the JWT token when signing in
			if (user) {
				token.id = user.id;
				// Add any other fields you want to store in the token
			}
			return token;
		},
		async session({ session, token }) {
			// Add user ID to the session
			if (session.user) {
				session.user.id = token.id;
				// Add any other user properties you want available in the session
			}
			return session;
		},
	},
	pages: {
		signIn: "/login", // Custom sign-in page (if you have one)
		// error: '/auth/error', // Error page
	},
	secret: process.env.NEXTAUTH_SECRET, // Use a strong secret key
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
