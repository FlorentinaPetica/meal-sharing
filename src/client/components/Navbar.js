import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg"

function Navbar() {

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
        <Link to="/"><img src={logo} alt="Logo"/></Link>
      </div>
      <div className="ContactNavLink">
        <ul>
          <li>Contact</li>
          <li>Log in</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
