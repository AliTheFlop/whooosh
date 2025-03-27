import { useSession, signOut } from "next-auth/react";
import ChatsSidebar from "./ChatsSidebar";
import useGlobalStore from "@/store/zustand";

export default function Sidebar() {
	const { data: session, status } = useSession();
	const newChat = useGlobalStore((state) => state.newChat);

	return (
		<>
			{/* Sidebar */}
			<div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col max-h-full font-sans">
				{/* Logo */}
				<div className="p-6 flex flex-row items-center justify-between border-b">
					<h3 className="text-2xl self-center font-bold font-headings text-stone-800 tracking-tighter">
						Whooosh
					</h3>
					<button
						className="px-3 py-2 bg-blue-700 hover:bg-blue-600 transition-all duration-200 text-white text-sm font-bold rounded-full"
						onClick={() => newChat()}
					>
						New Chat
					</button>
				</div>

				{/* Navigation Area */}
				<div className="flex-grow overflow-y-auto">
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
						<div className="px-4 py-4 w-full border-t flex flex-col">
							<div className="pb-2">
								<p className="font-bold text-lg capitalize">
									{session.user.name}
								</p>
								<p className="text-sm">{session.user.email}</p>
							</div>

							<button
								className="bg-blue-800 hover:bg-blue-600 text-white font-medium transition-all duration-200 px-4 py-2 rounded-lg mt-3"
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
