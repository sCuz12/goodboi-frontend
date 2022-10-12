import React from "react";
import { MdDateRange } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineEuroCircle, AiOutlineUser } from "react-icons/ai";

function FoundListingCardDetails({ item }) {
  return (
    <div className="flex flex-col pt-2 pl-7">
      <div className="justify-center text-lg text-center">
        <p className="col-span-4 font-bold truncate sm:text-sm lg:text-lg lg:w-full">
          {item.name}
        </p>
      </div>
      <div className="items-start justify-start g-0">
        <div className="flex w-full gap-0 text-sm">
          <MdDateRange size={20} />
          <p>{item.found_date}</p>
        </div>
        <div className="flex gap-2 text-sm">
          <IoLocationSharp size={20} />
          <p>{item.found_at}</p>
        </div>

        <div className="flex gap-2 text-sm">
          <AiOutlineUser size={20} />
          <p>{item.founder}</p>
        </div>
      </div>
    </div>
  );
}

export default FoundListingCardDetails;
