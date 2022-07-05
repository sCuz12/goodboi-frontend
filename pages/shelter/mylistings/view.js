import React, { useEffect, useState } from "react";
import ShelterRoute from "../../../components/Routes/ShelterRoutes";
import axiosInstance from "../../../helpers/axios";
import { useRouter } from "next/router";
import RowListingCard from "../../../components/Cards/RowListingCard";
import { toast } from "react-toastify";

function view() {
  const [CurrentShelterListings, setCurrentShelterListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    const fetchListings = async () => {
      const { data } = await axiosInstance.get("/api/shelter/current/listings");
      setCurrentShelterListings(data.data);
    };

    fetchListings();
  }, []);

  const deleteHandler = async (index) => {
    const answer = confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allListings = CurrentShelterListings;
    const removed = allListings.splice(index, 1);
    setCurrentShelterListings(allListings);
    //send request to BE
    try {
      const { data } = await axiosInstance.put(
        `api/shelter/animals/${removed[0].id}/delete`
      );
      toast.success("Listing succesfully deleted");
      router.push("/shelter/mylistings/view");
    } catch (err) {
      toast.error("Error Deleting listing");
    }
  };

  return (
    <ShelterRoute>
      <div className="mx-auto mt-24 w-4/4">
        <h1 className="flex justify-center header_titles font-cherryBomb">
          My Listings
        </h1>
        {/*Card*/}
        <div className="flex flex-col gap-y-5 ">
          {CurrentShelterListings.map((listing, index) => {
            return (
              <RowListingCard
                title={listing.title}
                description={listing.description}
                image={listing.cover_image}
                handleDelete={deleteHandler}
                id={listing.id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </ShelterRoute>
  );
}

export default view;
