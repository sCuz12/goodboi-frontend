import React, { useState } from "react";
import Image from "next/image";
import CardDetails from "./CardDetails";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoPawOutline, IoPaw } from "react-icons/io5";
import axiosInstance from "../../helpers/axios";
import { useRouter } from "next/router";
import axios from "axios";
function ListingCard({ item, isfavourite, token }) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(isfavourite);
  const handleOnFavourite = async () => {
    setIsFavourite(true);
    try {
      //if user is unauthenticated
      if (!token) {
        router.push("/login");
      }

      const { data } = await axiosInstance.post(`/api/favourite/${item.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFavourite = async () => {
    setIsFavourite(false);
    try {
      const { data } = await axiosInstance.post(`/api/unfavourite/${item.id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-roz hover:bg-basicPurple hover:text-white">
      <div className="items-center text-center">
        <div className="p-1.5 transition duration-300 ease-out transform cursor-pointer hover:scale-105">
          <Link href={`/animals/view/${item.id}`}>
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
          {isFavourite ? (
            <IoPaw
              className="absolute top-0 right-0 z-99"
              size={30}
              onClick={handleUnFavourite}
            />
          ) : (
            <IoPawOutline
              className="absolute top-0 right-2 z-99"
              size={30}
              onClick={handleOnFavourite}
            />
          )}
        </div>
      </div>

      <div>
        <CardDetails
          age={item.age}
          name={item.name}
          city={item.city}
          totalViews={item.total_views}
          shelter={item.shelter}
        />
      </div>
    </div>
  );
}

export default ListingCard;
