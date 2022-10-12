import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import FoundListingCardDetails from "./FoundListingCardDetails";

function FoundListingCard({ item }) {
  const router = useRouter();

  return (
    <div className="h-full bg-roz hover:bg-basicPurple hover:text-white">
      <div className="items-center text-center">
        <div className="p-1.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
          <div className="relative">
            <Link href={`/listings/lost-dogs/view/${item.dog_id}`}>
              <Image
                className="block object-cover shadow-inner rounded-2xl"
                src={item.cover_image}
                alt={item.name}
                width="100%"
                height="100%"
                layout="responsive"
              />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <FoundListingCardDetails item={item} />
      </div>
    </div>
  );
}

export default FoundListingCard;
