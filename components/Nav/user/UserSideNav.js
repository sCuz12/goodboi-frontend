import React from "react";
import SideBarItem from "../shelter/Items/SideBarItem";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import Logout from "../shelter/Items/Logout";

function UserSideNav() {
  return (
    <div className="flex-initial h-screen bg-white shadow-md lg:p-5 w-60 mt-28">
      <ul className="relative">
        <SideBarItem
          icon={
            <AiOutlineDashboard className="block float-left mr-2 text-xl text-black cursor-pointer" />
          }
          name="My Favourites"
          url="/user/favourites"
        />

        <Logout />
      </ul>
    </div>
  );
}

export default UserSideNav;
