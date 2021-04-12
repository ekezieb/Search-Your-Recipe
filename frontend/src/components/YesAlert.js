import React from "react";
import PropTypes from "prop-types";

const YesAlert = ({ alert }) => {
  return (
    <div className="yesalert">
      <h3>{alert}</h3>
    </div>
  );
};
YesAlert.propTypes = {
  alert: PropTypes.string.isRequired,
};
export default YesAlert;
