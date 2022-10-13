import React, { useEffect, useState } from "react";
import ShelterRoute from "../../../components/Routes/ShelterRoutes";
import axiosInstance from "../../../helpers/axios";
import { useRouter } from "next/router";
import RowListingCard from "../../../components/Cards/RowListingCard";
import { toast } from "react-toastify";
import { Tabs } from "antd";

function view() {
  const [CurrentShelterListings, setCurrentShelterListings] = useState([]);
  const [adoptedListings, setAdoptedListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    fetchListings();
    fetchAdoptedListings();
  }, []);

  const fetchListings = async () => {
    const { data } = await axiosInstance.get("/api/shelter/current/listings");
    setCurrentShelterListings(data.data);
  };

  const fetchAdoptedListings = async () => {
    const params = { status: 2 };
    const { data } = await axiosInstance.get("/api/shelter/current/listings", {
      params,
    });

    setAdoptedListings(data.data);
  };

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
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error Deleting listing");
      }
    }
  };

  const deleteAdoptedHandler = async (index) => {
    const answer = confirm("Are you sure you want to delete?");
    if (!answer) return;
    let listings = adoptedListings;

    const removed = listings.splice(index, 1);
    setAdoptedListings(adoptedListings);

    //send request to BE
    try {
      const { data } = await axiosInstance.put(
        `api/shelter/animals/${removed[0].id}/delete`
      );
      toast.success(data.data);
      router.push("/shelter/mylistings/view");
    } catch ({ err }) {
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error Deleting listing");
      }
    }
  };

  const adoptedHandler = async (id) => {
    const answer = confirm("Are you sure you want to mark this as adopted?");
    if (!answer) return;
    try {
      const { data } = await axiosInstance.post(
        `api/shelter/animals/${id}}/markAsAdopted`
      );
      router.push("/shelter/mylistings/view");
      toast.success("Listing marked as adopted");
    } catch (err) {
      toast.error("Error marking this listing as adopted");
    }
  };

  return (
    <ShelterRoute>
      <div className="mx-auto mt-24 w-4/4">
        <h1 className="flex justify-center header_titles font-cherryBomb">
          My Listings
        </h1>
        <Tabs centered>
          <Tabs.TabPane
            tab={<span style={{ fontSize: 18 }}>Active</span>}
            key="1"
          >
            {/*Card*/}

            <div className="flex flex-col gap-y-5 ">
              {CurrentShelterListings.map((listing, index) => {
                return (
                  <RowListingCard
                    listingType="active"
                    key={listing.id}
                    handleDelete={deleteHandler}
                    index={index}
                    item={listing}
                    handleAdopted={adoptedHandler}
                  />
                );
              })}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span style={{ fontSize: 18 }}>Adopted</span>}
            key="2"
            tabBarStyle={{ "font-size": "200px" }}
          >
            {adoptedListings.map((listing, index) => (
              <RowListingCard
                key={listing.id}
                listingType="deleted"
                handleDelete={deleteAdoptedHandler}
                index={index}
                item={listing}
                handleAdopted={adoptedHandler}
              />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </ShelterRoute>
  );
}

export default view;
