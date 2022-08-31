import React from "react";
import DogsWithCircle from "../CustomImages/DogsWithCircle";
import SolidPaw from "../Icons/SolidPaw";
import Heart from "../Icons/Heart";
import GetStarted from "../Buttons/GetStarted";
import Image from "next/image";
const dogsPictures = ["dog1", "dog2", "dog3", "dog4"];

function IndexBanner({ user }) {
  return (
    <section className="py-16 bg-red-100 ">
      <div className="flex items-center justify-center w-full">
        <div className="flex sm:flex-col lg:flex-row sm:w-full">
          {/**Left */}
          <div className="items-center w-full text-center lg:w-3/5 lg:text-left">
            <div className="">
              <div className="hidden lg:block">
                <SolidPaw height={60} width={60} />
              </div>

              <h1 className="font-cherryBomb text-darkPurple header_titles">
                Find your new <p>best friend!</p>{" "}
              </h1>

              <SolidPaw height={60} width={60} />
            </div>

            <p className="copyright_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="items-center text-center lg:text-left lg:w-full">
              {!user && <GetStarted />}
              <div className="hidden lg:block">
                <SolidPaw height={120} width={90} />
              </div>
            </div>
          </div>
          {/**Left */}
          {/** Desktop Photo section */}
          <div className="hidden w-2/5 lg:block ">
            {dogsPictures.map((imageName) => {
              <Image />;
            })}
            <div className="flex">
              <DogsWithCircle key={1} />
              <SolidPaw />
            </div>
            <div className="flex justify-center w-full">
              <Heart />
            </div>
          </div>
        </div>
      </div>
      {/**Mobile Photo with small images*/}

      <div className="flex w-full pt-20 lg:hidden">
        <div className="w-full h-20 bg-roz">
          <div className="flex mt-3 mb-3 ml-3 lg:h-80 lg:w-100 sm:h-40 sm:60">
            <div className="grid grid-cols-4 gap-12">
              {dogsPictures.map((imageName) => {
                return (
                  <Image
                    key={imageName}
                    src={`/assets/dogsSmall/${imageName}.png`}
                    height={60}
                    width={60}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndexBanner;
