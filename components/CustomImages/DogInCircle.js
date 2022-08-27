import Image from "next/image";
import React from "react";
import Heart from "../Icons/Heart";

export default function ({ image = "dog-1.png", circleColor = "bg-roz" }) {
  return (
    <div className="flex flex-col">
      <div className="flex w-1/5">
        <Heart />
      </div>

      <div
        className={`relative w-40 h-40 rounded-full lg:w-64 lg:h-64 ${circleColor}`}
      >
        <Image src={`/assets/banners/${image}`} layout="fill" />
      </div>
      <Image src="/assets/icons/solid_paw.png" height={50} width={50} />
    </div>
  );
}
