import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

function SubmitBtn({ name, disableButtonHandler, isLoading }) {
  console.log(disableButtonHandler);
  return (
    <div className="flex flex-wrap">
      <button
        className="px-4 py-2 font-bold text-white rounded-full bg-basicPurple disabled:opacity-25 disabled:cursor-not-allowed hover:bg-orange-200"
        type="submit"
        disabled={disableButtonHandler}
      >
        {isLoading ? <Spin /> : name}
      </button>
    </div>
  );
}

SubmitBtn.propTypes = {};

export default SubmitBtn;
