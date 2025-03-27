export default function Spinner() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 50 50"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					animation: "spin 1s linear infinite",
				}}
			>
				<style>{`
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
				`}</style>
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke="#3498db"
					strokeWidth="8"
					strokeDasharray="90 150"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}
