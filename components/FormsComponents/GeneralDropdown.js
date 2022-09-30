import React from "react";
import { Select } from "antd";
function GeneralDropdown({ data, handler, defaultValue, labelName }) {
  const options = [];
  //construct array of options
  data.map((option) => {
    options.push({ value: option.id, label: option.name });
  });

  return (
    <>
      <label className="form_label_text">{labelName}</label>
      <div className="relative">
        <Select
          options={options}
          defaultValue={defaultValue}
          onChange={handler}
          className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          id="cities"
        ></Select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default GeneralDropdown;
