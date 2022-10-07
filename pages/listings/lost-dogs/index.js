import React, { useEffect, useState } from "react";
import AbovePageSection from "../../../components/Sections/AbovePageSection";
import PinkCircle from "../../../components/CustomImages/DogInCircle";
import axiosInstance from "../../../helpers/axios";
import NoResults from "../../../components/CustomImages/Illustrations/NoResults";
import LostListingCard from "../../../components/Cards/LostListingCard";
import Pagination from "react-js-pagination";
import { Select } from "antd";
const { Option } = Select;

function index() {
  const [lostAnimals, setLostAnimals] = useState([]);
  const [totalListings, setTotalListings] = useState();
  const [activePage, setActivePage] = useState();
  const [perPage, setPerPage] = useState();
  const [sortBy, setSortBy] = useState(["lost_at", "desc"]);

  useEffect(() => {
    getInitialLostDogs();
  }, []);

  //handle when sort by is Selected
  useEffect(() => {
    sortLostDogsBy();
  }, [sortBy]);

  /* This method gets all lost dogs and sets the states*/
  const getInitialLostDogs = async (pageNumber = 1) => {
    const { data } = await axiosInstance.get(
      `/api/animals/lost-dogs/all?page=${pageNumber}&sortBy=${sortBy[0]}&sortValue=${sortBy[1]}`
    );
    setActivePage(data.meta.current_page);
    setPerPage(data.meta.per_page);
    setTotalListings(data.meta.total);
    setLostAnimals(data.data);
  };

  /**Retrieves sorted listings  & set animals state*/
  const sortLostDogsBy = async () => {
    const { data } = await axiosInstance.get(
      `/api/animals/lost-dogs/all?sortBy=${sortBy[0]}&sortValue=${sortBy[1]}`
    );

    setLostAnimals(data.data);
  };

  const sortData = [
    {
      label: "Newest",
      key: "lost_at_desc",
    },
    {
      label: "Oldest",
      key: "lost_at_asc",
    },
  ];

  const handleSortChange = (value) => {
    switch (value) {
      case "lost_at_asc":
        setSortBy(["lost_at", "asc"]);
        break;
      case "lost_at_desc":
        setSortBy(["lost_at", "desc"]);
        break;
    }
  };

  return (
    <div className="pt-0 lg:pt-20 lg:pb-20">
      <section>
        <AbovePageSection
          title={"Be a dog saver"}
          description="Contribute to efforts to find lost dogs asdada asdadasdasdasdas asdsadsa"
          image={<PinkCircle />}
        />
      </section>
      <section>
        <div className="w-full h-auto md:flex lg:flex">
          {/* Listings */}
          <div className="p-4 lg:pr-8 lg:w-4/5 sm:px-16 ">
            <div className="flex">
              <h1 className="w-3/4 header_titles font-cherryBomb">Lost Dogs</h1>
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
            {lostAnimals.length == 0 ? (
              <div className="flex justify-center w-full pt-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
                {lostAnimals.map((item) => (
                  <div
                    key={item.id}
                    className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
                  >
                    <LostListingCard item={item} />
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
                onChange={(pageNumber) => getInitialLostDogs(pageNumber)}
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
