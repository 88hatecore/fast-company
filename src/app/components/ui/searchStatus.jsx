import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number > 5 && number < 15) return "Человек тусанет";
    if (number > 1 && number <= 4) return "Человека тусанет";
    return "Человек тусанет";
  };
  return (
    <h2>
      <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
        {length > 0
          ? `${length} ${renderPhrase(length)} с тобой`
          : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number
};

export default SearchStatus;
