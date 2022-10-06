import React from "react";
import PropTypes from "prop-types";

function Textarea({ onChange, isRequired, defaultValue }) {
  return (
    <textarea
      onChange={onChange}
      className="form_input_textarea"
      id="grid-description"
      type="textarea"
      required={isRequired}
      defaultValue={defaultValue}
    />
  );
}

Textarea.propTypes = {
  isRequired: PropTypes.bool,
};

export default Textarea;
