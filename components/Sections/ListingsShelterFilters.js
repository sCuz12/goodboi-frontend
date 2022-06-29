import React from "react";
import { MdSort } from "react-icons/md";
export default function ({ cities, handleToggle }) {
  return (
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
          {cities.map((city) => (
            <div key={city.name} className="flex ">
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
  );
}
