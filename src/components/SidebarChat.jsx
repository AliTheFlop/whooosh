export default function SidebarChat({ name }) {
    return (
        <li className="text-lg overflow-hidden pl-5 flex items-center mb-5">
            <img
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3"
            />
            <a
                href="#"
                className="block py-2 overflow-ellipsis whitespace-nowrap overflow-hidden"
            >
                {name}
            </a>
        </li>
    );
}
