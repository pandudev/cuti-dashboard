import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../services/firebase";

const Pengguna = (props) => {
  const [penggunaList, setPenggunaList] = useState(props.penggunaList);
  const [showList, setshowList] = useState(props.penggunaList);
  const history = useHistory();

  const handleSearch = (e) => {
    let fromData = penggunaList;
    let newData = [];
    let x = Object.keys(fromData).map((key) => {
      if (
        fromData[key].nama.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        newData.push(fromData[key]);
      }
    });

    newData.length > 0 ? setshowList(newData) : setshowList(null);
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
              <th className="text-center">No</th>
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
            {showList !== null ? (
              Object.keys(showList).map((key, i) => {
                return (
                  <tr key={key}>
                    <td className="text-center">{i + 1}</td>
                    <td>{showList[key].nip}</td>
                    <td>{showList[key].nama}</td>
                    <td>{showList[key].jenisKelamin}</td>
                    <td>{showList[key].email}</td>
                    <td>{showList[key].telepon}</td>
                    <td>{showList[key].jabatan}</td>
                    <td>{showList[key].role}</td>
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
                  Data pengguna tidak ditemukan
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
