import "./globals.css";
//import "./prism.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Chat - Whooosh!",
	description:
		"Whooosh.net is a modern, unique AI chat app with a multi-modal selector.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>{children}</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}
