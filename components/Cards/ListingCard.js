import React, { useState } from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoPawOutline, IoPaw } from "react-icons/io5";
import axiosInstance from "../../helpers/axios";
import { useRouter } from "next/router";
import axios from "axios";
function ListingCard({
  image,
  name,
  title,
  age,
  city,
  id,
  token,
  isfavourite,
  totalViews,
}) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(isfavourite);
  const handleOnFavourite = async () => {
    setIsFavourite(true);
    try {
      //if user is unauthenticated
      if (!token) {
        router.push("/login");
      }
      const { data } = await axiosInstance.post(`/api/favourite/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFavourite = async () => {
    setIsFavourite(false);
    try {
      const { data } = await axiosInstance.post(`/api/unfavourite/${id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-roz hover:bg-basicPurple hover:text-white">
      <div className="items-center text-center">
        <div className="p-1.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
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

            {isFavourite ? (
              <IoPaw
                className="absolute top-0 right-0 z-99"
                size={30}
                onClick={handleUnFavourite}
              />
            ) : (
              <IoPawOutline
                className="absolute top-0 right-0 z-99"
                size={30}
                onClick={handleOnFavourite}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <CardDetails
          age={age}
          name={name}
          city={city}
          totalViews={totalViews}
        />
      </div>
    </div>
  );
}

export default ListingCard;
