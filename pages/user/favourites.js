import React, { useEffect, useState } from "react";
import ListingCard from "../../components/Cards/ListingCard";
import UserRoute from "../../components/Routes/UserRoutes";
import axiosInstance from "../../helpers/axios";
import NoResults from "../../components/CustomImages/Illustrations/NoResults";

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
  }, [favListings]);

  const getFavouritesOfUser = async () => {
    const { data } = await axiosInstance.get("/api/user/favourites");
    setFavListings(data.data);
  };
  return (
    <UserRoute>
      <div className="pt-20">
        <main className="px-8 mx-auto max-w-7xl sm:px-16">
          <section className="pt-6">
            <h3 className="pb-5 header_titles">My Favourites</h3>
            {favListings.length === 0 ? (
              <div className="flex justify-center w-full pt-20 pb-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favListings.map((item) => (
                  <div
                    key={item.id}
                    className="mb-10 overflow-hidden rounded-2xl"
                  >
                    <ListingCard
                      name={item.name}
                      image={item.cover_image}
                      title={item.title}
                      age={item.age}
                      city={item.city}
                      id={item.id}
                      token={token}
                      isfavourite={item.is_favourited}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </UserRoute>
  );
}

export default favourites;