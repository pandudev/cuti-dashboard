import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const PenggunaForm = (props) => {
  const roleOptions = ["direktur", "admin", "pegawai"];

  const initialPengguna = {
    nip: "",
    nama: "",
    jenisKelamin: "laki-laki",
    telepon: "",
    email: "",
    password: "",
    jabatan: "",
    role: roleOptions[2],
  };

  const passwords = {
    password: "",
    confirmPassword: "",
  };

  const history = useHistory();

  const [password, setPassword] = useState(passwords);
  var [pengguna, setPengguna] = useState(initialPengguna);

  useEffect(() => {
    if (props.penggunaKey === "") {
      setPengguna({ ...initialPengguna });
    } else {
      setPengguna({
        ...props.penggunaList[props.penggunaKey],
      });
    }
  }, [props.penggunaKey]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setPengguna({
      ...pengguna,
      [name]: value,
    });
  };

  const handleInputPassword = (e) => {
    let { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });

    setPengguna({
      ...pengguna,
      password: password.password,
    });
  };

  const formValidation = () => {
    let isValid = true;
    let error = [];

    for (let key in pengguna) {
      if (pengguna[key] === "") {
        error.push("Mohon isi " + key);
        isValid = false;
      }
    }

    if (props.penggunaKey === "" && password.password.length < 6) {
      error.push("Password minimal 6 karakter");
      isValid = false;
    } else if (
      props.penggunaKey === "" &&
      password.password !== password.confirmPassword
    ) {
      error.push("Password tidak sama, mohon ulangi");
      isValid = false;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(pengguna.email).toLowerCase())) {
      error.push("Email tidak valid");
      isValid = false;
    }

    error.map((err) => {
      props.NotificationManager.warning(err);
    });
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formValidation()) {
      props.submitAction(pengguna);
      history.push("/pengguna");
    }
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
            {props.penggunaKey == "" ? "Tambah" : "Edit"} Pengguna
          </h1>
        </div>
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <div className="form-group row">
            <label
              htmlFor="nip"
              className="col-sm-2 col-form-label col-form-label-sm"
            >
              NIP
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                name="nip"
                id="nip"
                placeholder="Nomor Induk Pegawai"
                value={pengguna.nip}
                onChange={handleInputChange}
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
                value={pengguna.nama}
                onChange={handleInputChange}
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
                value={pengguna.jenisKelamin}
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
                value={pengguna.telepon}
                onChange={handleInputChange}
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
                type="text"
                className="form-control form-control-sm"
                id="email"
                placeholder="Email"
                name="email"
                value={pengguna.email}
                disabled={props.penggunaKey !== ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {props.penggunaKey == "" ? (
            <>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password.password}
                    onChange={handleInputPassword}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="confirmPassword"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  Confirm Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handleInputPassword}
                  />
                </div>
              </div>
            </>
          ) : null}
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
                value={pengguna.jabatan}
                onChange={handleInputChange}
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
                value={pengguna.role}
                onChange={handleInputChange}
                disabled={props.penggunaKey !== ""}
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
                className="btn btn-sm btn-outline-primary"
              >
                <i className="fa fa-chevron-left mr-2"></i>
                Kembali
              </button>
              <button type="submit" className="btn btn-sm btn-primary ml-3">
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
