export default function Spinner() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{ marginRight: "1rem" }}
		>
			<style>{`
        .spinner {
          transform-origin: center;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
			<circle
				className="spinner"
				cx="12"
				cy="12"
				r="10"
				fill="none"
				stroke="#3498db"
				strokeWidth="3"
				strokeDasharray="40 60"
			/>
		</svg>
	);
}
