import Image from "next/image";
import React from "react";
import Heart from "../Icons/Heart";

export default function ({ image = "dog-1.png" }) {
  return (
    <div className="flex flex-col">
      <div className="flex w-1/5">
        <Heart />
      </div>

      <div className="relative rounded-full w-80 h-80 bg-roz">
        <Image src={`/assets/banners/${image}`} layout="fill" />
      </div>
      <Image src="/assets/icons/solid_paw.png" height={50} width={50} />
    </div>
  );
}
