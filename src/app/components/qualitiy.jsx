import React from "react";
import PropTypes from "prop-types";

const Qualitiy = ({ color, name }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Qualitiy.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Qualitiy;
