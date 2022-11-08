import React, { useEffect, useState } from "react";
import AbovePageSection from "../../../components/Sections/AbovePageSection";
import PinkCircle from "../../../components/CustomImages/DogInCircle";
import axiosInstance from "../../../helpers/axios";
import NoResults from "../../../components/CustomImages/Illustrations/NoResults";
import FoundListingCard from "../../../components/Cards//Listings/Found/FoundListingCard";
import Pagination from "react-js-pagination";
import { Select } from "antd";
const { Option } = Select;

function index() {
  const [foundAnimals, setFoundAnimals] = useState([]);
  const [totalListings, setTotalListings] = useState();
  const [activePage, setActivePage] = useState();
  const [perPage, setPerPage] = useState();
  const [sortBy, setSortBy] = useState(["found_at", "desc"]);

  useEffect(() => {
    getInitialFoundDogs();
  }, []);

  //handle when sort by is Selected
  useEffect(() => {
    sortFoundDogsBy();
  }, [sortBy]);

  /* This method gets all found dogs and sets the states*/
  const getInitialFoundDogs = async (pageNumber = 1) => {
    const { data } = await axiosInstance.get(
      `/api/animals/found-dogs/all?page=${pageNumber}&sortBy=${sortBy[0]}&sortValue=${sortBy[1]}`
    );
    setActivePage(data.meta.current_page);
    setPerPage(data.meta.per_page);
    setTotalListings(data.meta.total);
    setFoundAnimals(data.data);
  };

  /**Retrieves sorted listings  & set animals state*/
  const sortFoundDogsBy = async () => {
    const { data } = await axiosInstance.get(
      `/api/animals/found-dogs/all?sortBy=${sortBy[0]}&sortValue=${sortBy[1]}`
    );

    setFoundAnimals(data.data);
  };

  const sortData = [
    {
      label: "Newest",
      key: "found_at_desc",
    },
    {
      label: "Oldest",
      key: "found_at_asc",
    },
  ];

  const handleSortChange = (value) => {
    switch (value) {
      case "found_at_asc":
        setSortBy(["found_at", "asc"]);
        break;
      case "found_at_desc":
        setSortBy(["found_at", "desc"]);
        break;
    }
  };

  return (
    <div className="pt-0 lg:pt-20 lg:pb-20">
      <section>
        <AbovePageSection
          title={"Be a dog saver"}
          description="Some people who the extra mile and rescue dogs that are lost but now found! Check out all the dogs found by our heros!"
          image={<PinkCircle />}
        />
      </section>
      <section>
        <div className="w-full h-auto md:flex lg:flex">
          {/* Listings */}
          <div className="p-4 lg:pr-8 lg:w-4/5 sm:px-16 ">
            <div className="flex">
              <h1 className="w-3/4 header_titles font-cherryBomb">
                Found Dogs
              </h1>
              {/**Sorting ui */}
              <Select
                style={{ width: 120 }}
                onChange={handleSortChange}
                defaultValue={sortData[0]}
              >
                {sortData.map((sort) => (
                  <Option key={sort.key}>{sort.label}</Option>
                ))}
              </Select>
            </div>
            {foundAnimals.length == 0 ? (
              <div className="flex justify-center w-full pt-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
                {foundAnimals.map((item) => (
                  <div
                    key={item.dog_id}
                    className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
                  >
                    <FoundListingCard key={item.id} item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {totalListings > 10 && (
          /* Pagination */
          <div className="flex flex-row justify-center w-full pt-10">
            <div className="w-2/4 ">
              <Pagination
                totalItemsCount={totalListings}
                activePage={activePage}
                itemsCountPerPage={perPage}
                onChange={(pageNumber) => getInitialFoundDogs(pageNumber)}
                itemClass="page_item"
                linkClass="page_link"
                firstPageText="First"
                lastPageText="Last"
              />
            </div>
          </div>
        )}
        ;
      </section>
    </div>
  );
}

export default index;
