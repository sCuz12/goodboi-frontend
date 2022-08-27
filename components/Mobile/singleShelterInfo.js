import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";

function singleShelterInfo({ shelter }) {
  return (
    <div className="flex-col w-full p-8 space-y-4 bg-roz rounded-xl">
      <div className="flex w-full description_text">
        <div className="flex w-1/5">
          <AiOutlineMail size={30} />
        </div>
        <div className="w-4/5">{shelter.email}</div>
      </div>
      <div className="flex w-full description_text">
        <div className="flex w-1/5">
          <GoLocation size={30} />
        </div>
        <div className="w-4/5">{shelter.city}</div>
      </div>
      <div className="flex w-full description_text">
        <div className="flex w-1/5">
          <BsTelephone size={30} />
        </div>
        <div className="w-4/5">{shelter.phone}</div>
      </div>
    </div>
  );
}

export default singleShelterInfo;
