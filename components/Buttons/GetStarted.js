import React from "react";

function GetStarted() {
  return (
    <div>
      <button className="w-full h-10 lg:mt-5 lg:w-80 x-3 lg:py-1.5 bg-basicPurple border rounded-3xl border-1 ">
        <a
          href="/register"
          className="flex justify-center text-white cursor-pointer "
        >
          <span className="item-center">Get Started</span>
        </a>
      </button>
    </div>
  );
}

export default GetStarted;
