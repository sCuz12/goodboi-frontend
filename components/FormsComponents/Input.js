import React from "react";
import PropTypes from "prop-types";

function Input({ onChange, type, isRequired, defaultValue }) {
  return (
    <input
      onChange={onChange}
      className="form_input_box"
      type={type}
      required={isRequired}
      defaultValue={defaultValue}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
