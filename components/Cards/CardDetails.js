import React from "react";
import { GoLocation } from "react-icons/go";
import { BsEye } from "react-icons/bs";

function CardDetails({ name, age, city, totalViews }) {
  return (
    <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1">
      <div className="flex flex-col pt-3 pl-7">
        <div className="text-lg">
          <p className="col-span-4 font-bold truncate sm:text-sm lg:text-lg lg:w-full">
            {name}
          </p>
        </div>
        <p className="grid justify-center gird-cols-2">
          <div className="flex space-x-1">
            <BsEye size={20} /> <span>{totalViews}</span>
          </div>
        </p>
      </div>
      <div className="container mx-auto">
        <span className="font-thin">Age:</span>
        <span className="pl-1 font-medium font-bold">{age} years old</span>
      </div>
      <div className="flex items-center mx-auto ">
        <span className="pr-2">
          <GoLocation />
        </span>
        <span>{city}</span>
      </div>
    </div>
  );
}

export default CardDetails;
