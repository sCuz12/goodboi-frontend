import React, { useEffect, useState } from "react";
import AbovePageSection from "../../components/Sections/AbovePageSection";
import PinkCircle from "../../components/CustomImages/DogInCircle";
import axiosInstance from "../../helpers/axios";
import ShelterCard from "../../components/Cards/ShelterCard";
import ListingsFilters from "../../components/Filters/ListingsFilters";
import { MdSort } from "react-icons/md";

export default function Shelters() {
  const [shelterListings, setShelterListings] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [checkedCity, setCheckedCity] = useState([]);
  const [filtersCollapse, setFiltersCollapse] = useState(false);

  const BANNER_TITLE = "Explore Shelters";
  const BANNER_DESCRIPTION =
    "Check out all the available shelters in your area along with all the dogs listing! Start looking for your next best friend today!.";

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
    const { data } = await axiosInstance.get("/api/cities/");
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
    if (checkedCity.length > 0) {
      let formData = new FormData();
      for (const option of checkedCity) {
        formData.append("city[]", option);
      }

      const { data } = await axiosInstance.post("/api/get_shelters", formData);
      setShelterListings(data.data);
    }
  };

  const openFiltersHandler = () => {
    filtersCollapse ? setFiltersCollapse(false) : setFiltersCollapse(true);
  };

  return (
    <div className="pt-0 lg:pt-20 lg:pb-20">
      <section>
        <AbovePageSection
          title={BANNER_TITLE}
          description={BANNER_DESCRIPTION}
          image={<PinkCircle />}
        />
      </section>
      <section className="w-full h-auto lg:flex md:flex ">
        {/* Filters */}
        {filtersCollapse ? (
          <div className="pl-4 pr-32">
            <MdSort onClick={openFiltersHandler} size={30} />
          </div>
        ) : (
          <ListingsFilters
            cities={citiesFilter}
            isCollapse={filtersCollapse}
            openFiltersHandler={openFiltersHandler}
            handleSelect={handleToggle}
          />
        )}
        {/* Shelter Listings */}
        <div className="lg:w-4/5 sm:w-3/5 max-w-7xl sm:px-16 lg:pr-8">
          <h1 className="header_titles font-cherryBomb">All Shelters</h1>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shelterListings.map((item) => (
              <div
                key={item.id}
                className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
              >
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
