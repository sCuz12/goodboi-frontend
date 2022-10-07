import React, { useState } from "react";
import SideBarItem from "../shelter/Items/SideBarItem";
import { AiOutlineDashboard, AiOutlineProfile } from "react-icons/ai";
import { GiLoveHowl } from "react-icons/gi";
import Logout from "../shelter/Items/Logout";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { SiDatadog } from "react-icons/si";
import { IoCreateOutline } from "react-icons/io5";

function UserSideNav() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const expandSidebarHandler = () => {
    setIsSidebarCollapsed(false);
  };

  const collapseSidebarHandler = () => {
    setIsSidebarCollapsed(true);
  };
  return (
    <>
      {isSidebarCollapsed ? (
        <div className="pl-4 pr-4 lg:pr-4 pt-28">
          <BsArrowUpRight onClick={expandSidebarHandler} size={20} />
        </div>
      ) : (
        <>
          <div className="flex-initial h-screen bg-white shadow-md lg:p-5 w-60 mt-28">
            <div className="flex items-end justify-end w-full">
              <BsArrowDownLeft size={20} onClick={collapseSidebarHandler} />
            </div>
            <ul className="relative">
              <SideBarItem
                icon={
                  <AiOutlineDashboard className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Dashboard"
                url="/user/"
              />
            </ul>
            <ul className="relative">
              <SideBarItem
                icon={
                  <AiOutlineProfile className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Account Profile"
                url="/user/profile/update"
              />
              <SideBarItem
                icon={
                  <IoCreateOutline className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Post Lost Dog"
                url="/user/lost-dogs/create"
              />
              <SideBarItem
                icon={
                  <SiDatadog className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="My Listings"
                url="/user/lost-dogs/mylistings"
              />
              <SideBarItem
                icon={
                  <GiLoveHowl className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="My Favourites"
                url="/user/favourites"
              />

              <Logout />
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default UserSideNav;
