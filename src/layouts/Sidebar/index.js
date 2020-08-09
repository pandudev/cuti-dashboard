import React from "react";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "../../services/authService";
import config from "./../../config";

const Sidebar = ({ user }) => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar pt-0 pt-md-5 collapse"
    >
      <div className="sidebar-sticky pt-0 d-flex flex-column">
        <div className="container-fluid bg-danger text-light py-4">
          <div className="row">
            <div className="col-3">Nama</div>
            <div className="col-9">: {user?.nama}</div>
            <div className="col-3">Jabatan</div>
            <div className="col-9">: {user?.jabatan}</div>
          </div>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" exact activeClassName="active" className="nav-link">
              <i className="fa fa-home mr-2"></i>
              Beranda <span className="sr-only"></span>
            </NavLink>
          </li>
          {user.role == "admin" ? (
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
          ) : null}
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
            <Link
              onClick={() => {
                if (window.confirm("Yakin ingin logout?")) {
                  signOut();
                }
              }}
              className="nav-link"
            >
              <i className="fa fa-sign-out-alt mr-2"></i>
              Logout
            </Link>
          </li>
        </ul>
        <div className="copyright p-1 text-center">
          &copy; {config.namaPerusahaan} {new Date().getFullYear()}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
