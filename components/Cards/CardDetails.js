import React from "react";
import { GoLocation } from "react-icons/go";
import { BsEye } from "react-icons/bs";
import Image from "next/image";

function CardDetails({ name, age, city, totalViews, shelter }) {
  return (
    <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1">
      <div className="flex flex-col pt-3 ">
        <div className="text-lg">
          <p className="col-span-4 font-bold truncate sm:text-sm lg:text-lg lg:w-full">
            {name}
          </p>
        </div>
        <div className="grid justify-center pb-6 gird-cols-2">
          <div className="flex space-x-1">
            <BsEye size={20} /> <span>{totalViews}</span>
          </div>
        </div>
      </div>

      <div className="container flex flex-col justify-center pb-3 mx-auto space-x-4">
        <div className="flex">
          <span className="font-thin">Age:</span>
          <span className="pl-1 font-medium font-bold">{age} years old</span>
        </div>

        {/* <span className="font-thin">Shelter:</span>
        <span className="pl-1 font-medium font-bold">{age} years old</span> */}
        <div className="flex">
          <span className="pr-2">
            <Image
              src="/assets/icons/shelter_icon.png"
              height={14}
              width={14}
            />
            <span className="pl-1 font-medium font-bold lg:inline-block">
              {shelter}
            </span>
          </span>
        </div>
        <div className="flex">
          <span>
            <GoLocation />
          </span>
          <span className="pl-1 font-medium font-bold lg:inline-block">
            {city}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
