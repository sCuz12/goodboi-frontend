import Head from "next/head";
import React from "react";
import { useEffect, useState, useContext } from "react";
import ListingCard from "../components/Cards/ListingCard";
import axiosInstance from "../helpers/axios";
import ShelterCard from "../components/Cards/ShelterCard";
import IndexBanner from "../components/Banners/IndexBanner";
import NavButton from "../components/Buttons/NavButton";
import NoResults from "../components/CustomImages/Illustrations/NoResults";
import { Context } from "../context";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [shelters, setShelters] = useState([]);
  const { state, dispatch } = useContext(Context);
  const [token, setToken] = useState("");
  const { user } = state;

  useEffect(() => {
    const localItemToken = window.localStorage.getItem("token");
    if (localItemToken) {
      setToken(localItemToken);
      axiosInstance.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(
        "token"
      )}`;
    }

    const fetchListings = async () => {
      const { data } = await axiosInstance.get("/api/animals/dogs");
      //Slice to Limit only 8 in index
      setListings(data.data.slice(0, 8));
    };

    const fetchShelters = async () => {
      const { data } = await axiosInstance.get("/api/get_shelters");
      setShelters(data.data.slice(0, 8));
    };

    fetchListings();
    fetchShelters();
  }, []);

  return (
    <>
      <Head>
        <title>Adopt dog</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-20"></div>
      <IndexBanner user={user} />
      {/* Listings */}
      <main className="p-4 lg:p-16 ">
        <section className="lg:p-6">
          <h3 className="pb-5 header_titles">Adopt Me</h3>
          {listings.length === 0 ? (
            <div className="flex justify-center w-full pt-20 pb-20">
              <NoResults />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.map((item) => (
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

          <div className="flex justify-center mx-auto">
            <NavButton title="See more" link="/listings/animals" />
          </div>
        </section>
        {/* Shelter section*/}
        <section className="pt-6">
          <h3 className="pb-5 header_titles">Find Shelter</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shelters.map((item) => (
              <div key={item.id} className="mb-10 overflow-hidden rounded-2xl">
                <ShelterCard
                  id={item.id}
                  name={item.shelter_name}
                  image={item.cover_image}
                  city={item.city}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mx-auto ">
            <NavButton title="See more" link="/listings/shelters" />
          </div>
        </section>
      </main>
    </>
  );
}
