import React from "react";
import { GiDogHouse } from "react-icons/gi";
import { GoLocation } from "react-icons/go";

function ShelterCardDetails({ name, city }) {
  return (
    <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1 ">
      <div className="grid grid-cols-5 pt-3 pl-7 text-l">
        <span className="col-span-4 font-bold truncate sm:text-sm lg:text-lg lg:w-full">
          {name}
        </span>
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

export default ShelterCardDetails;
