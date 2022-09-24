import React from "react";
import { RiMessengerLine } from "react-icons/ri";

function DirectMessage() {
  return (
    <div className="flex items-center px-2 border lg:w-4/5 w-5/5 rounded-3xl border-1 bg-darkPink">
      <div className="flex items-center justify-center w-full h-12 pt-4 space-x-2">
        <p className="text-center ">
          <RiMessengerLine size={20} color="white" />
        </p>
        <button className="" onClick={onclick}>
          <p className="text-xl text-center text-white cursor-pointer md:inline-flex w-max">
            Direct Message
          </p>
        </button>
      </div>
    </div>
  );
}

export default DirectMessage;
