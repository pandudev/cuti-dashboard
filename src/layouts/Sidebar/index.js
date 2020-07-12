import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar pt-0 pt-md-5 collapse"
    >
      <div className="sidebar-sticky pt-0 d-flex flex-column">
        <div className="container-fluid bg-danger text-light py-4">
          <div className="row">
            <div className="col-3">Nama</div>
            <div className="col-9">: Administrator</div>
            <div className="col-3">Jabatan</div>
            <div className="col-9">: HRD</div>
          </div>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" exact activeClassName="active" className="nav-link">
              <i className="fa fa-home mr-2"></i>
              Beranda <span className="sr-only"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/pengguna"
              activeClassName="active"
              className="nav-link"
            >
              <i className="fa fa-user mr-2"></i>
              Pengguna
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/laporan"
              activeClassName="active"
              className="nav-link"
            >
              <i className="fa fa-file-alt mr-2"></i>
              Laporan
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link">
              <i className="fa fa-sign-out-alt mr-2"></i>
              Logout
            </NavLink>
          </li>
        </ul>
        <div className="copyright p-3 text-center">
          &copy; PT. Angin Ribut 2020
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
