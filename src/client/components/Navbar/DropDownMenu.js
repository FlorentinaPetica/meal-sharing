import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";

const DropDownMenu = ({ toggle, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="DropDownBar">
          <div className="DropDownMenu">
            <div className="Logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="Close">
              <FaTimes onClick={toggle} />
            </div>
          </div>
          <div className="DropDownLinks">
            <ul>
              <Link to="/meals" onClick={toggle}>
                <li>Our Meals</li>
              </Link>
              <Link to="/add" onClick={toggle}>
                <li>Share Meal</li>
              </Link>
              <li>Contact</li>
              <li>Log in</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
