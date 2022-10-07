import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LostDogRowListing from "../../../components/Cards/LostDogRowListing.js";
import NormalUserRoute from "../../../components/Routes/UserTypeRoutes";
import axiosInstance from "../../../helpers/axios";
import { useRouter } from "next/router";

function mylistings() {
  const [currentUserListings, setCurrentUserListings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchUserLostListings();
  }, []);

  const fetchUserLostListings = async () => {
    const token = window.localStorage.getItem("token");
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axiosInstance.get(
      "/api/user/lost-dogs/current/listings"
    );
    setCurrentUserListings(data.data);
  };

  /**Handlers */
  const deleteHandler = async (index) => {
    const answer = confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allListings = currentUserListings;
    const removed = allListings.splice(index, 1);

    setCurrentUserListings(allListings);
    //update be
    try {
      const { data } = await axiosInstance.put(
        `api/user/lost-dogs/delete/${removed[0].dog_id}`
      );
      toast.success("Listing succesfully deleted");
      router.push("/");
    } catch (err) {
      toast.error("Error Deleting listing");
    }
  };

  return (
    <NormalUserRoute showSide={true}>
      <div className="max-w-2xl mx-auto mt-24">
        <h3 className="pb-4 text-center header_titles font-cherryBomb">
          My Listings
        </h3>
        <div className="flex flex-col gap-y-5 ">
          {currentUserListings.map((listing, index) => {
            return (
              <LostDogRowListing
                handleDelete={deleteHandler}
                key={index}
                index={index}
                listing={listing}
              />
            );
          })}
        </div>
      </div>
    </NormalUserRoute>
  );
}

export default mylistings;
