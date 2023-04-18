import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={`https://avatars.dicebear.com/api/adventurer/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`}
          height="40"
          alt=""
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Профиль
        </Link>
        <Link to="logout" className="dropdown-item">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
