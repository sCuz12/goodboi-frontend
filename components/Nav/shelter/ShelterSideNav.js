import React from "react";
import { AiOutlineDashboard, AiOutlineProfile } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import SideBarItem from "./Items/SideBarItem";
import { SiDatadog } from "react-icons/si";
function ShelterSideNav() {
  return (
    <div className="flex-initial h-screen bg-white shadow-md lg:p-5 w-60 mt-28">
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
      </ul>
    </div>
  );
}

export default ShelterSideNav;
