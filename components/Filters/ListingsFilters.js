import React from "react";
import { AiOutlineLeftCircle } from "react-icons/ai";

function ListingsFilters({
  cities,
  isCollapse,
  openFiltersHandler,
  handleSelect,
}) {
  return (
    <div
      className={`flex lg:w-1/5 right-0  z-40 pl-20" ${
        isCollapse ? "-translate-x-full" : "translate-x-0"
      } `}
    >
      <div className="flex flex-col w-full pl-3 border rounded-xl">
        <div className="flex w-full ">
          <h2 className="w-4/5 text-xl font-bold">Filters</h2>
          <div className="flex items-end justify-end w-1/5">
            <AiOutlineLeftCircle onClick={openFiltersHandler} size={30} />
          </div>
        </div>
        {/*Location */}
        <div className="flex-col pt-2">
          <h2 className="w-4/5 text-xl">Location</h2>
          {cities.map((city) => (
            <div key={city.name} className="flex ">
              <label
                className="w-1/2 form-check-label"
                htmlFor="flexCheckDefault"
              >
                {city.name}
              </label>
              <input
                onChange={() => handleSelect(city.id)}
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
  );
}

export default ListingsFilters;
