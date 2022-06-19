import React from "react";
import { GoLocation } from "react-icons/go";

function CardDetails({ name, age, city }) {
  return (
    <div className="grid justify-center gap-px text-center gird-cols-2 gap-x-1">
      <div className="grid grid-cols-5 pt-3 pl-7 text-l">
        <p className="col-span-4 text-lg font-bold ">{name}</p>
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
