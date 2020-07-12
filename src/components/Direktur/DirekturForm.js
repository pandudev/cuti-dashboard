import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebaseDb from "./../../firebase";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const DirekturForm = () => {
  const initialState = {
    id: "",
    nama: "",
    jenisKelamin: "",
    telepon: "",
    email: "",
    jabatan: "",
  };

  const roleOptions = ["direktur", "admin", "pegawai"];

  const history = useHistory();

  var [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    firebaseDb.child("user").push(values, (err) => {
      if (err) {
        console.log(err);
      } else {
        NotificationManager.success("Data direktur telah ditambah");
        history.push("/data-direktur");
      }
    });
  };

  return (
    <>
      <NotificationContainer />
      <div className="fadeIn">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h3">Tambah Direktur</h1>
        </div>
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <div className="form-group row">
            <label
              htmlFor="id"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              ID
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                name="id"
                value={values.id}
                onChange={handleInputChange}
                id="id"
                placeholder="ID"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="nama"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              Nama
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                name="nama"
                id="nama"
                placeholder="Nama"
                value={values.nama}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-form-label-sm col-sm-2 pt-0">
                Jenis Kelamin
              </legend>
              <div className="col-sm-10 d-flex">
                <div className="form-check mr-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jenisKelamin"
                    id="lakiLaki"
                    value="laki-laki"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="lakiLaki">
                    Laki-laki
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jenisKelamin"
                    id="perempuan"
                    value="perempuan"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="perempuan">
                    Perempuan
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="form-group row">
            <label
              htmlFor="telepon"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              Telepon
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                id="telepon"
                placeholder="Telepon"
                name="telepon"
                onSelect={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="email"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
              <Link
                to="/data-direktur"
                type="button"
                className="btn btn-outline-primary"
              >
                <i className="fa fa-chevron-left mr-2"></i>
                Kembali
              </Link>
              <button type="submit" className="btn btn-primary ml-3">
                <i className="fa fa-save mr-2"></i>
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DirekturForm;
