import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import LostListingCardDetails from "./LostListingCardDetails";

function LostListingCard({ item }) {
  const router = useRouter();
  {
    item;
  }
  return (
    <div className="h-full bg-roz hover:bg-basicPurple hover:text-white">
      <div className="items-center text-center">
        <div className="p-1.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
          <Link href={`/listings/lost-dogs/view/${item.id}`}>
            <div className="relative">
              <Image
                className="block object-cover shadow-inner rounded-2xl"
                src={item.cover_image}
                alt={item.name}
                width="100%"
                height="100%"
                layout="responsive"
              />
            </div>
          </Link>
        </div>
      </div>
      <div>
        <LostListingCardDetails item={item} />
      </div>
    </div>
  );
}

export default LostListingCard;
