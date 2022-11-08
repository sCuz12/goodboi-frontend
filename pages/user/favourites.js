import React, { useEffect, useState } from "react";
import ListingCard from "../../components/Cards/ListingCard";
import axiosInstance from "../../helpers/axios";
import NoResults from "../../components/CustomImages/Illustrations/NoResults";
import NormalUserRoute from "../../components/Routes/UserTypeRoutes";

function favourites() {
  const [favListings, setFavListings] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const localItemToken = window.localStorage.getItem("token");
    setToken(localItemToken);
    axiosInstance.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
    getFavouritesOfUser();
  }, []);

  //dependency that runs when the favourites listing change to retrieve the new one
  useEffect(() => {
    getFavouritesOfUser();
  }, [favListings]);

  const getFavouritesOfUser = async () => {
    const { data } = await axiosInstance.get("/api/user/favourites");
    setFavListings(data.data);
  };
  return (
    <NormalUserRoute showSide={true}>
      <div className="pt-20">
        <main className="px-8 mx-auto max-w-7xl sm:px-16">
          <section className="pt-6">
            <h3 className="pb-5 text-center header_titles">My Favourites</h3>
            {favListings.length === 0 ? (
              <div className="flex justify-center w-full pt-20 pb-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
                {favListings.map((item) => (
                  <div
                    key={item.id}
                    className="mb-10 overflow-hidden rounded-2xl"
                  >
                    <ListingCard
                      item={item}
                      token={token}
                      isfavourite={item.is_favourited}
                      totalViews={item.total_views}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </NormalUserRoute>
  );
}

export default favourites;
