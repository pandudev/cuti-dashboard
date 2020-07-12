import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebaseDb from "./../../firebase";

const Pengguna = (props) => {
  console.log(props);
  const [penggunaList, setPenggunaList] = useState(props.penggunaList);
  const history = useHistory();

  const handleSearch = (e) => {
    firebaseDb
      .child("pengguna")
      .orderByChild("nama")
      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          setPenggunaList(snapshot.val());
        } else {
          setPenggunaList(null);
        }
      });
  };

  const handleEdit = (id) => {
    props.editAction(id);
    history.push("/pengguna/form");
  };

  const handleDelete = (id) => {
    props.deleteAction(id);
  };

  return (
    <div className="fadeIn">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <h1 className="h3">Data Pengguna</h1>
        <div className="header-tools d-flex">
          <Link
            to="/pengguna/form"
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
              <th className="text-center">#</th>
              <th>ID</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Jabatan</th>
              <th>Role</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penggunaList !== null ? (
              Object.keys(penggunaList).map((id, i) => {
                return (
                  <tr key={id}>
                    <td className="text-center">{i + 1}</td>
                    <td>{penggunaList[id].id}</td>
                    <td>{penggunaList[id].nama}</td>
                    <td>{penggunaList[id].jenisKelamin}</td>
                    <td>{penggunaList[id].email}</td>
                    <td>{penggunaList[id].telepon}</td>
                    <td>{penggunaList[id].jabatan}</td>
                    <td>{penggunaList[id].role}</td>
                    <td className="text-center">
                      <a
                        href="#"
                        onClick={() => handleEdit(id)}
                        className="mr-3"
                      >
                        <i className="fa fa-pencil-alt"></i>
                      </a>
                      <a
                        href="#"
                        onClick={() => handleDelete(id)}
                        className="text-danger"
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pengguna;
