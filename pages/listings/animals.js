import Image from "next/image";
import React, { useState, useEffect } from "react";
import ListingCard from "../../components/Cards/ListingCard";
import PinkCircle from "../../components/CustomImages/DogInCircle";
import axiosInstance from "../../helpers/axios";
import { MdSort } from "react-icons/md";

import AbovePageSection from "../../components/Sections/AbovePageSection";
import Pagination from "react-js-pagination";
import NoResults from "../../components/CustomImages/Illustrations/NoResults";

function animals() {
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [checkedCity, setCheckedCity] = useState([]);
  const [animalListings, setAnimalLIstings] = useState([]);
  const [totalListings, setTotalListings] = useState();
  const [activePage, setActivePage] = useState();
  const [perPage, setPerPage] = useState();

  useEffect(() => {
    getInitialListings();
    getCities();
  }, []);

  useEffect(() => {
    filterListingsFromCities();
  }, [checkedCity]);

  /* Method gets all cities and set state*/
  const getCities = async () => {
    const { data } = await axiosInstance.post("/api/cities/all");
    setCitiesFilter(data);
  };

  /* This method gets all listings and sets the states*/
  const getInitialListings = async (pageNumber = 1) => {
    const { data } = await axiosInstance.get(
      `/api/animals/dogs?page=${pageNumber}`
    );
    setAnimalLIstings(data.data);
    setTotalListings(data.meta.total);
    setActivePage(data.meta.current_page);
    setPerPage(data.meta.per_page);
  };

  const filterListingsFromCities = async () => {
    console.log(checkedCity);
    /* If user removes all filters*/
    if (checkedCity.length === 0) {
      getInitialListings();
      return;
    }

    if (checkedCity.length > 0) {
      let formData = new FormData();
      for (const option of checkedCity) {
        formData.append("city[]", option);
      }

      const { data } = await axiosInstance.post("/api/animals/dogs", formData);
      setAnimalLIstings(data.data);
      setTotalListings(data.data.total);
    }
  };

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

  return (
    <div className="pt-40">
      {/* Header section */}
      <section className="">
        <AbovePageSection
          title={"Leave no one behind !"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          image={<PinkCircle />}
        />
      </section>
      <section>
        <div className="w-full h-auto md:flex lg:flex">
          {/* Filters*/}
          <div className="flex lg:w-1/5 sm:w-2/5">
            <div className="flex flex-col w-full pl-3 border rounded-xl">
              <div className="flex w-full ">
                <h2 className="w-4/5 text-xl font-bold">Filters</h2>
                <div className="items-end justify-end w-1/5">
                  <MdSort size={40} />
                </div>
              </div>
              {/*Location */}
              <div className="flex-col pt-2">
                <h2 className="w-4/5 text-xl">Cities</h2>
                {citiesFilter.map((city) => (
                  <div className="flex ">
                    <label
                      className="w-1/2 form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {city.name}
                    </label>
                    <input
                      onChange={() => handleToggle(city.id)}
                      className="w-1/2"
                      type="checkbox"
                      id={city.id}
                      name={city.name}
                      value={city.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Listings */}
          <div className="lg:w-4/5 sm:w-3/5 max-w-7xl sm:px-16">
            <h1 className="header_titles font-cherryBomb">All Dogs</h1>

            {animalListings.length == 0 ? (
              <div className="flex justify-center w-full pt-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {animalListings.map((item) => (
                  <div className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30">
                    <ListingCard
                      key={item.id}
                      name={item.name}
                      image={item.cover_image}
                      title={item.title}
                      age={item.age}
                      city={item.city}
                      id={item.id}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalListings > 10 && (
              <div className="flex flex-row justify-center w-full pt-10">
                <div className="w-2/4 ">
                  <Pagination
                    totalItemsCount={totalListings}
                    activePage={activePage}
                    itemsCountPerPage={perPage}
                    onChange={(pageNumber) => getInitialListings(pageNumber)}
                    itemClass="page_item"
                    linkClass="page_link"
                    firstPageText="First"
                    lastPageText="Last"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default animals;
