import React from "react";
import PropTypes from "prop-types";

const NoAlert = ({ alert }) => {
  return (
    <div className="noalert">
      <h3>{alert}</h3>
    </div>
  );
};

NoAlert.propTypes = {
  alert: PropTypes.string.isRequired,
};
export default NoAlert;
