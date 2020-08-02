import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../services/firebase";

const Pengguna = (props) => {
  const [penggunaList, setPenggunaList] = useState(props.penggunaList);
  const history = useHistory();

  const handleSearch = (e) => {
    db.ref("pengguna")
      .orderByChild("nama")
      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setPenggunaList(snapshot.val());
        } else {
          setPenggunaList(null);
        }
      });
  };

  const handleEdit = (key) => {
    props.editAction(key);
    history.push("/pengguna/form");
  };

  const handleDetail = (key) => {
    props.detailAction(key);
    history.push("/pengguna/detail");
  };

  const handleDelete = (key) => {
    props.deleteAction(key);
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
              <span className="input-group-text" key="addon-wrapping">
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
              <th>NIP</th>
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
              Object.keys(penggunaList).map((key, i) => {
                return (
                  <tr key={key}>
                    <td className="text-center">{i + 1}</td>
                    <td>{penggunaList[key].nip}</td>
                    <td>{penggunaList[key].nama}</td>
                    <td>{penggunaList[key].jenisKelamin}</td>
                    <td>{penggunaList[key].email}</td>
                    <td>{penggunaList[key].telepon}</td>
                    <td>{penggunaList[key].jabatan}</td>
                    <td>{penggunaList[key].role}</td>
                    <td className="text-center">
                      <a
                        href="#"
                        onClick={() => handleDetail(key)}
                        className="mx-1 text-success"
                      >
                        <i className="fa fa-eye"></i>
                      </a>
                      <a
                        href="#"
                        onClick={() => handleEdit(key)}
                        className="mx-1"
                      >
                        <i className="fa fa-pencil-alt"></i>
                      </a>
                      <a
                        href="#"
                        onClick={() => handleDelete(key)}
                        className="text-danger mx-1"
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
