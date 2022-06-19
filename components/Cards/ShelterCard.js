import React from "react";
import Image from "next/image";
import ShelterCardDetails from "./ShelterCardDetails";
import Link from "next/link";

function ShelterCard({ id, name, image, city }) {
  return (
    <div className="bg-roz hover:bg-basicPurple hover:text-white">
      <Link href={`/shelters/view/${id}`}>
        <div className="items-center text-center">
          <div className="p-2.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
            <Image
              className="object-cover shadow-inner rounded-2xl"
              src={image}
              alt={name}
              width="100%"
              height="100%"
              layout="responsive"
            />
          </div>
        </div>
      </Link>
      <div>
        <ShelterCardDetails name={name} city={city} />
      </div>
    </div>
  );
}

export default ShelterCard;
