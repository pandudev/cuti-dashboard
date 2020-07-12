import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const PenggunaForm = (props) => {
  const initialState = {
    id: "",
    nama: "",
    jenisKelamin: "laki-laki",
    telepon: "",
    email: "",
    jabatan: "",
    role: "pegawai",
  };

  const roleOptions = ["direktur", "admin", "pegawai"];
  const history = useHistory();

  var [values, setValues] = useState(initialState);

  useEffect(() => {
    if (props.penggunaId == "") {
      setValues({ ...initialState });
    } else {
      setValues({
        ...props.penggunaList[props.penggunaId],
      });
    }
  }, [props.penggunaId, props.penggunaList]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.submitAction(values);
    history.push("/pengguna");
  };

  const handleBack = () => {
    props.backAction();
    history.push("/pengguna");
  };

  return (
    <>
      <div className="fadeIn">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h3">
            {props.penggunaId == "" ? "Tambah" : "Edit"} Pengguna
          </h1>
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
                required
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
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="jenisKelamin"
              className="col-sm-2 col-form-label col-form-label-sm col-form-label-sm"
            >
              Jenis Kelamin
            </label>
            <div className="col-sm-10">
              <select
                className="form-control form-control-sm"
                name="jenisKelamin"
                value={values.jenisKelamin}
                onChange={handleInputChange}
                id="jenisKelamin"
              >
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
          </div>
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
                value={values.telepon}
                onChange={handleInputChange}
                required
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
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="jabatan"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              Jabatan
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                id="jabatan"
                placeholder="Jabatan"
                name="jabatan"
                value={values.jabatan}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="role"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              Role
            </label>
            <div className="col-sm-10">
              <select
                className="form-control form-control-sm"
                name="role"
                value={values.role}
                onChange={handleInputChange}
                id="role"
              >
                {roleOptions.map((role, i) => {
                  return (
                    <option key={i} value={role}>
                      {role}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
              <button
                onClick={() => handleBack()}
                type="button"
                className="btn btn-outline-primary"
              >
                <i className="fa fa-chevron-left mr-2"></i>
                Kembali
              </button>
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

export default PenggunaForm;
