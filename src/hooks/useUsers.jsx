import React, { useContext } from "react";
import PropTypes from "prop-types";

const UserContenxt = React.createContext();

export const useUser = () => {
  return useContext(UserContenxt);
};

const UserProvider = ({ children }) => {
  return <UserContenxt.Provider>{children}</UserContenxt.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;
