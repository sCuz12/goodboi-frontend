import React from "react";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { Radio, Slider } from "antd";

const GENDER_FILTERS = [
  {
    label: "Male",
    value: "m",
  },
  {
    label: "Female",
    value: "f",
  },
  {
    label: "Both",
    value: "b",
  },
];

function ListingsFilters({
  cities,
  isCollapse,
  openFiltersHandler,
  handleSelect,
  genderFilterHandler,
  showGenderFilter,
  handleAgeFilter,
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
          <div className="flex w-full mt-5 text-center border bottom-3" />
          {showGenderFilter && (
            <>
              <h2 className="w-4/5 text-xl">Gender</h2>
              <div className="flex flex-col">
                <Radio.Group>
                  {GENDER_FILTERS.map((gender) => {
                    return (
                      <Radio.Button
                        key={gender.value}
                        value={gender.value}
                        onChange={() => genderFilterHandler(gender.value)}
                      >
                        {gender.label}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </div>
            </>
          )}
          <div className="flex w-full mt-5 text-center border bottom-3" />
          <>
            <h2 className="w-4/5 text-xl">Age</h2>
            <div className="flex flex-col">
              {" "}
              <Slider
                range
                defaultValue={[0, 20]}
                onChange={handleAgeFilter}
                max={20}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default ListingsFilters;
