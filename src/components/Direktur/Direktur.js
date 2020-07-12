import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "./../../firebase";

const Direktur = () => {
  const [direkturObject, setdirekturObject] = useState({});

  useEffect(() => {
    firebaseDb.child("user").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setdirekturObject({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const handleSearch = (e) => {
    firebaseDb
      .child("user")
      .orderByChild("nama")
      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff")
      .on("value", (snapshot) => {
        setdirekturObject({
          ...snapshot.val(),
        });
        console.log(snapshot.val());
      });
  };

  return (
    <div className="fadeIn">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <h1 className="h3">Data Direktur</h1>
        <div className="header-tools d-flex">
          <Link
            to="/data-direktur/tambah"
            href="#"
            className="btn bold-icon btn-primary mr-2"
          >
            <i className="fa fa-plus mr-2"></i>Tambah
          </Link>
          <div className="input-group flex-nowrap search-bar">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <i className="fa fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="addon-wrapping"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Jenis Kelamin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(direkturObject).map((id, i) => {
              return (
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>{direkturObject[id].id}</td>
                  <td>{direkturObject[id].nama}</td>
                  <td>{direkturObject[id].email}</td>
                  <td>{direkturObject[id].telepon}</td>
                  <td>{direkturObject[id].jenisKelamin}</td>
                  <td>
                    {" "}
                    <a href="#">
                      <i className="fa fa-pencil-alt mr-2"></i>Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Direktur;
