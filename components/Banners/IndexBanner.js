import React from "react";
import DogsWithCircle from "../CustomImages/DogsWithCircle";
import SolidPaw from "../Icons/SolidPaw";
import Heart from "../Icons/Heart";

function IndexBanner() {
  return (
    <section className="py-16 bg-red-100">
      <div className="container flex px-2 mx-auto">
        <div className="w-1/2">
          <div className="flex w-full">
            <SolidPaw height={60} width={60} />
            <h1 className="text-7xl font-cherryBomb text-darkPurple">
              Find your new <p>best friend!</p>{" "}
            </h1>

            <SolidPaw height={60} width={60} />
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex w-full">
            <button className=" w-80 h-2/3 px-3 py-1.5 bg-basicPurple border rounded-3xl border-1">
              <a
                href="/"
                className="hidden text-white cursor-pointer md:inline-flex w-max"
              >
                Get Started
              </a>
            </button>
            <SolidPaw height={120} width={90} />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex">
            <DogsWithCircle key={1} />
            <SolidPaw />
          </div>
          <div className="flex justify-center w-full">
            <Heart />
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndexBanner;
