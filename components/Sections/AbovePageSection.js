import React from "react";
import SolidPaw from "../Icons/SolidPaw";
import Heart from "../Icons/Heart";

export default function AbovePageSection({ title, description, image }) {
  return (
    <div className="flex w-full text-center h-96 ">
      <div className="flex w-4/5 lg:w-4/5">
        <div className="flex flex-col items-start justify-center pl-6">
          <h1 className="header_titles">{title}</h1>
          <div className="flex w-full lg:w-1/2">
            <p>{description}</p>
            <div className="hidden lg:block">
              <SolidPaw />
            </div>
          </div>
          <Heart />
        </div>
      </div>
      <div className="flex hidden w-2/5 lg:block">
        <div className="h-auto">{image}</div>
      </div>
    </div>
  );
}
