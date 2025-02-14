import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
    title: "Whooosh",
    description: "Make new friends",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="h-screen w-screen flex bg-gradient-to-br from-indigo-900 to-purple-900">
                <div className="flex w-full ">
                    <div className="min-w-72">
                        <Sidebar />
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </body>
        </html>
    );
}
