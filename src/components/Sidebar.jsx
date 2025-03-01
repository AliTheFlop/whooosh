import { useSession, signOut } from "next-auth/react";
import ChatsSidebar from "./ChatsSidebar";

export default function Sidebar() {
	const { data: session, status } = useSession();

	return (
		<>
			{/* Sidebar */}
			<div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
				{/* Logo */}
				<div className="p-6">
					<h3 className="text-2xl font-semibold text-gray-800">
						Whooosh
					</h3>
				</div>

				{/* Navigation Area */}
				<div className="flex-1">
					{session ? (
						<ChatsSidebar userId={session.user.id} />
					) : (
						<p>Chats loading</p>
					)}
				</div>

				{/* Logout */}
				{session ? (
					status === "loading" ? (
						<p className="w-full text-center">Loading</p>
					) : (
						<div className="px-4 py-4 w-full border-t">
							<div className="pb-2">
								<p className="font-bold text-lg capitalize">
									{session.user.name}
								</p>
								<p className="text-sm">{session.user.email}</p>
							</div>

							<button
								className="p-3.5 rounded-lg 
                    bg-gray-100 
                    hover:bg-gray-200 
                    text-gray-700 
                    font-medium 
                    transition-all duration-200
                    w-full"
								onClick={() => signOut()}
							>
								Logout
							</button>
						</div>
					)
				) : (
					<p className="w-full font-bold text-center pb-5">
						Not logged in!
					</p>
				)}
			</div>
		</>
	);
}
