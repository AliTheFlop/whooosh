import "./globals.css";
import "./prism.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import Prism from "prismjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AI Chat App",
	description: "A modern AI chat application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
