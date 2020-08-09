import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import config from "./../../config";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark sticky-top bg-primary  flex-md-nowrap p-0 shadow">
      <NavLink
        to="/"
        exact
        className="navbar-brand col-md-3 col-lg-2 mr-0 px-3"
      >
        {config.namaPerusahaan}
      </NavLink>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul className="navbar-nav px-3">
        <li className="nav-item">
          <a className="nav-link  text-light" href="#">
            <i className="fa fa-user mr-2"></i>
            {user?.nama} ({user?.role})
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
