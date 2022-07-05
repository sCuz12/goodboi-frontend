import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";

function CallShelter({ onclick, telephone, email }) {
  return (
    <div className="flex items-center w-4/5 px-2 border rounded-3xl border-1 bg-basicPurple">
      <div className="flex items-center justify-center w-full h-12 pt-4 space-x-2">
        <p className="text-center ">
          <BsFillTelephoneFill size={20} color="white" />
        </p>
        <button className="" onClick={onclick}>
          <p className="text-xl text-center text-white cursor-pointer md:inline-flex w-max">
            Call Shelter
          </p>
        </button>
      </div>
    </div>
  );
}

export default CallShelter;
