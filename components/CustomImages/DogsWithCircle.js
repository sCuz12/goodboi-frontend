import Image from "next/image";
import React from "react";
import Heart from "../Icons/Heart";

const dogsPictures = [
  "dog1",
  "dog2",
  "dog3",
  "dog4",
  "dog5",
  "dog6",
  "dog7",
  "dog8",
  "dog9",
  "dog10",
  "dog11",
  "dog12",
  "dog13",
  "dog14",
  "dog15",
  "dog16",
];

function DogsWithCircle() {
  return (
    <div className="flex flex-col">
      <div className="flex w-1/5">
        <Heart />
      </div>

      <div className="rounded-full w-96 h-96 bg-roz">
        <div className="flex m-5 h-80 w-100">
          <div className="grid grid-cols-4 gap-4 ">
            {dogsPictures.map((imageName) => {
              return (
                <Image
                  src={`/assets/dogsSmall/${imageName}.png`}
                  height={60}
                  width={100}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogsWithCircle;
