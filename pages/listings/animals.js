import React, { useState, useEffect } from "react";
import ListingCard from "../../components/Cards/ListingCard";
import PinkCircle from "../../components/CustomImages/DogInCircle";
import axiosInstance from "../../helpers/axios";
import { MdSort } from "react-icons/md";
import { BiSort } from "react-icons/bi";

import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";

import { DownOutlined } from "@ant-design/icons";

import AbovePageSection from "../../components/Sections/AbovePageSection";
import Pagination from "react-js-pagination";
import NoResults from "../../components/CustomImages/Illustrations/NoResults";
import ListingsFilters from "../../components/Filters/ListingsFilters";
import { useRouter } from "next/router";

function animals() {
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [checkedCity, setCheckedCity] = useState([]);
  const [animalListings, setAnimalLIstings] = useState([]);
  const [totalListings, setTotalListings] = useState();
  const [activePage, setActivePage] = useState();
  const [perPage, setPerPage] = useState();
  const [token, setToken] = useState("");
  const [filtersCollapse, setFiltersCollapse] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [showpagination, setShowpagination] = useState(true);

  const BANNER_DESCRIPTION =
    "Have a look at all the available dogs looking to find their next home! Scroll down and we are sure you will find a cute dog waiting for you.";

  const router = useRouter();
  console.log(router.query);

  const serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  let url = serialize(router.query);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setToken(token);

    getCities();
  }, []);

  useEffect(() => {
    if (checkedCity.length != 0) {
      router.query.city = checkedCity.join(",");
      router.push(router);
    }
  }, [checkedCity]);

  useEffect(() => {
    sortListingsBy();
  }, [sortBy]);

  useEffect(() => {
    if (checkedCity.length == 0) {
      router.push("/listings/animals");
    }
  }, [checkedCity]);

  useEffect(() => {
    if (url) {
      console.log(url);
      const fetchData = async (pageNumber = 1) => {
        console.log(`/api/animals/dogs?` + url + `page=${pageNumber}`);
        try {
          const { data } = await axiosInstance.get(`/api/animals/dogs?` + url);
          console.log(data);
          setAnimalLIstings(data.data);
          setTotalListings(data.meta.total);
          setActivePage(data.meta.current_page);
          setPerPage(data.meta.per_page);
          setShowpagination(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    } else {
      getInitialListings(activePage);
    }
  }, [url]);

  /* Method gets all cities and set state*/
  const getCities = async () => {
    const { data } = await axiosInstance.get("/api/cities");
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

  //sends add sort fields and send request
  const sortListingsBy = async () => {
    let formData = new FormData();
    formData.append("sort", sortBy[0]);
    formData.append("sortValue", sortBy[1]);
    const { data } = await axiosInstance.post("/api/animals/dogs", formData);
    setAnimalLIstings(data.data);
    setTotalListings(data.data.total);
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

  const openFiltersHandler = () => {
    filtersCollapse ? setFiltersCollapse(false) : setFiltersCollapse(true);
    console.log(filtersCollapse);
  };

  //Handles the sort click of item
  const MenuClickHandler = (e) => {
    switch (e.key) {
      case "name":
        setSortBy([e.key, "asc"]);
        break;
      case "nameDesc":
        setSortBy(["name", "desc"]);
        break;
      case "created_at":
        setSortBy([e.key, "asc"]);
        break;
      case "created_at_desc":
        setSortBy(["created_at", "desc"]);
        break;
      case "total_views":
        setSortBy([e.key, "desc"]);
        break;
      default:
        setSortBy(["name", "asc"]);
    }
  };

  /* Handles the change of gender in filters*/
  const genderFilterHandler = async (value) => {
    //means both so initial filter listing
    router.query.gender = value;
    router.push(router);
  };

  const handleAgeFilterHandler = async (values) => {
    router.query.minAge = values[0];
    router.query.maxAge = values[1];
    router.push(router);
  };

  const sortMenu = (
    <Menu
      onClick={MenuClickHandler}
      items={[
        {
          label: "Name Ascending",
          key: "name",
        },
        {
          label: "Name Descending",
          key: "nameDesc",
        },
        {
          label: "Oldest first",
          key: "created_at",
        },
        {
          label: "Newest first",
          key: "created_at_desc",
        },
        {
          label: "Most viewed",
          key: "total_views",
        },
      ]}
    />
  );
  return (
    <div className="pt-0 lg:pt-20 lg:pb-20">
      {/* Header section */}
      <section>
        <AbovePageSection
          title={"Leave no one behind !"}
          description={BANNER_DESCRIPTION}
          image={<PinkCircle />}
        />
      </section>
      <section>
        <div className="w-full h-auto md:flex lg:flex">
          {/* Filters*/}
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
              genderFilterHandler={genderFilterHandler}
              handleAgeFilter={handleAgeFilterHandler}
              showGenderFilter={true}
              showAgeFilter={true}
            />
          )}

          {/* Listings */}
          <div className="p-4 lg:pr-8 lg:w-4/5 sm:px-16 ">
            <div className="flex ">
              <h1 className="w-3/4 header_titles font-cherryBomb">All Dogs</h1>
              {/**Sorting ui */}
              <Dropdown overlay={sortMenu}>
                <Button>
                  <Space>
                    <BiSort />
                    Sorty By
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>

            {animalListings.length == 0 ? (
              <div className="flex justify-center w-full pt-20">
                <NoResults />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {animalListings.map((item) => (
                  <div
                    key={item.id}
                    className="p-0 overflow-hidden rounded-2xl lg:p-0 md:p-0 sm:p-30"
                  >
                    <ListingCard
                      item={item}
                      key={item.id}
                      token={token}
                      isfavourite={item.is_favourited}
                      totalViews={item.total_views}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalListings > 10 && showpagination && (
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
