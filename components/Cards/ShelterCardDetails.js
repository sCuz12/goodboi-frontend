import React from "react";
import { GiDogHouse } from "react-icons/gi";
import { GoLocation } from "react-icons/go";

function ShelterCardDetails({ name, city }) {
  return (
    <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1 ">
      <div className="justify-center p-3 ">
        <span className="overflow-hidden text-lg font-bold whitespace-nowrap text-ellipsis">
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
