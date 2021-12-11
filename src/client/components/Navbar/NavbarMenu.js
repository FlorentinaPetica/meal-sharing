import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg"

function NavbarMenu({ toggle }) {
  return (
    <nav className="Navbar">
      <div className="PagesNavLink">
        <ul>
          <Link to="/meals">
            <li>Our Meals</li>
          </Link>
          <Link to="/add">
            <li>Share Meal</li>
          </Link>
        </ul>
      </div>
      <div className="Logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="ContactNavLink">
        <ul>
          <li>Contact</li>
          <li>Log in</li>
        </ul>
      </div>
      <div className="Bars">
        <FaBars
          onClick={toggle}
        />
      </div>
    </nav>
  );
}

export default NavbarMenu;
