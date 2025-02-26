/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				whooosh: {
					primary: "#1E1E3F", // Deep Space Blue
					secondary: "#8B3DFF", // Electric Violet
					accent: "#00F5D4", // Cyber Mint
					dark: "#111111", // Rich Black
					light: "#F8F9FA", // Soft White
				},
			},
		},
	},
	plugins: [],
};
