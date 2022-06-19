import React from "react";

function SideBarItem({ icon, name, url }) {
  return (
    <li className="relative">
      <a
        className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
        href={url}
      >
        {icon}
        <span className="text-black text">{name}</span>
      </a>
    </li>
  );
}

export default SideBarItem;
