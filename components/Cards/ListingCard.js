import React from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";
import Link from "next/link";
function ListingCard({ image, name, title, age, city, id }) {
  return (
    <div className="bg-roz hover:bg-basicPurple hover:text-white">
      <Link href={`/animals/view/${id}`}>
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
        <CardDetails age={age} name={name} city={city} />
      </div>
    </div>
  );
}

export default ListingCard;
