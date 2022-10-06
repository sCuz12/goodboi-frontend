import React from "react";
import PropTypes from "prop-types";

function Label({ labelName, isRequired }) {
  return (
    <label className="form_label_text">
      Lost Dog Name
      <span className="required"></span>
    </label>
  );
}

Label.propTypes = {
  labelName: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Label;
