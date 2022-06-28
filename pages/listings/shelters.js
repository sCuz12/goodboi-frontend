import React, { useEffect, useState } from "react";
import AbovePageSection from "../../components/Sections/AbovePageSection";
import PinkCircle from "../../components/CustomImages/DogInCircle";

import axiosInstance from "../../helpers/axios";
import ListingsShelterFilters from "../../components/Sections/ListingsShelterFilters";
import ShelterCard from "../../components/Cards/ShelterCard";

export default function Shelters() {
  const [shelterListings, setShelterListings] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [checkedCity, setCheckedCity] = useState([]);

  const BANNER_TITLE = "Explore Shelters";
  const BANNER_DESCRIPTION =
    "lorem lorem lorem lorem lorem lorem lorem lorem lorem lore m lorem lorem lorem lorem lorem lorem lorem lore";

  useEffect(() => {
    getAllShelters();
    getCities();
  }, []);

  useEffect(() => {
    filterSheltersByCities();
  }, [checkedCity]);

  /* Get Shelters api call & set state */
  const getAllShelters = async () => {
    const { data } = await axiosInstance.get("/api/get_shelters");
    setShelterListings(data.data);
  };

  /* Get Cities api call & set state */
  const getCities = async () => {
    const { data } = await axiosInstance.post("/api/cities/all");
    setCitiesFilter(data);
  };

  //Handle checkbox click
  const handleToggle = (id) => {
    const currentIndex = checkedCity.indexOf(id);
    const newChecked = [...checkedCity];

    //remove it or add it depends if exist
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCity(newChecked);
  };

  const filterSheltersByCities = async () => {
    console.log(checkedCity);
    if (checkedCity.length > 0) {
      let formData = new FormData();
      for (const option of checkedCity) {
        formData.append("city[]", option);
      }

      const { data } = await axiosInstance.post("/api/get_shelters", formData);
      setShelterListings(data.data);
    }
  };

  return (
    <div className="pt-40">
      <section>
        <AbovePageSection
          title={BANNER_TITLE}
          description={BANNER_DESCRIPTION}
          image={<PinkCircle />}
        />
      </section>
      <section className="w-full h-auto lg:flex md:flex ">
        {/* Filters */}
        <ListingsShelterFilters
          cities={citiesFilter}
          handleToggle={handleToggle}
        />
        {/* Shelter Listings */}
        <div className="lg:w-4/5 sm:w-3/5 max-w-7xl sm:px-16">
          <h1 className="header_titles font-cherryBomb">All Shelters</h1>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shelterListings.map((item) => (
              <div className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30">
                <ShelterCard
                  name={item.shelter_name}
                  image={item.cover_image}
                  city={item.city}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
