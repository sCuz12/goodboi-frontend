import React, { useState } from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axiosInstance from "../../helpers/axios";
import { useRouter } from "next/router";
function ListingCard({ image, name, title, age, city, id, token }) {
  const [isLiked, setisLiked] = useState(false);
  const router = useRouter();

  const handleOnFavourite = async () => {
    try {
      //if user is unauthenticated
      if (!token) {
        router.push("/login");
      }
      const { data } = await axiosInstance.post(`/api/favourite/${id}`);
      console.log(data);
      setisLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-roz hover:bg-basicPurple hover:text-white">
      <div className="items-center text-center">
        <div className="p-2.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
          <div className="relative">
            <Link href={`/animals/view/${id}`}>
              <Image
                className="block object-cover shadow-inner rounded-2xl"
                src={image}
                alt={name}
                width="100%"
                height="100%"
                layout="responsive"
              />
            </Link>

            {isLiked ? (
              <AiFillHeart className="absolute top-0 right-0 z-99" size={25} />
            ) : (
              <AiOutlineHeart
                className="absolute top-0 right-0 z-99"
                size={25}
                onClick={handleOnFavourite}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <CardDetails age={age} name={name} city={city} />
      </div>
    </div>
  );
}

export default ListingCard;
