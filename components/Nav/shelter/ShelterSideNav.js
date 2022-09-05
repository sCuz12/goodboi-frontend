import React, { useState } from "react";
import { AiOutlineDashboard, AiOutlineProfile } from "react-icons/ai";
import { GiLoveHowl } from "react-icons/gi";
import { IoCreateOutline } from "react-icons/io5";
import SideBarItem from "./Items/SideBarItem";
import { SiDatadog } from "react-icons/si";
import Logout from "./Items/Logout";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";

function ShelterSideNav() {
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
        <div className="pl-4 pr-4  lg:pr-4 pt-28">
          <BsArrowUpRight onClick={expandSidebarHandler} size={20} />
        </div>
      ) : (
        <>
          <div
            className={`flex-initial h-screen bg-white shadow-md lg:p-5 sm:w-12 lg:w-60 mt-28  `}
          >
            <div className="flex items-end justify-end w-full">
              <BsArrowDownLeft size={20} onClick={collapseSidebarHandler} />
            </div>
            <ul className="relative">
              <SideBarItem
                icon={
                  <AiOutlineDashboard className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Dashboard"
                url="/shelter/"
              />

              <SideBarItem
                icon={
                  <IoCreateOutline className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="List Dog"
                url="/shelter/listing/create"
              />

              <SideBarItem
                icon={
                  <AiOutlineProfile className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Shelter Profile"
                url="/shelter/profile/update"
              />
              <SideBarItem
                icon={
                  <SiDatadog className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="My Listings"
                url="/shelter/mylistings/view"
              />
              <SideBarItem
                icon={
                  <AiOutlineProfile className="block float-left mr-2 text-xl text-black cursor-pointer" />
                }
                name="Account Profile"
                url="/user/profile/update"
              />
              <Logout />
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default ShelterSideNav;
