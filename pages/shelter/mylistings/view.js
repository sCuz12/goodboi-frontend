import React, { useEffect, useState } from "react";
import ShelterRoute from "../../../components/routes/ShelterRoutes";
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
    let allLessons = CurrentShelterListings;
    const removed = allLessons.splice(index, 1);
    setCurrentShelterListings(allLessons);
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
      <div className="mx-auto mt-40 w-4/4">
        <h1 className="flex justify-center text-2xl">My Listings</h1>
        {/*Card*/}
        <div className="flex flex-col gap-y-5 ">
          {CurrentShelterListings.map((listing) => {
            return (
              <RowListingCard
                title={listing.title}
                description={listing.description}
                image={listing.cover_image}
                handleDelete={deleteHandler}
                id={listing.id}
              />
            );
          })}
        </div>
      </div>
    </ShelterRoute>
  );
}

export default view;
