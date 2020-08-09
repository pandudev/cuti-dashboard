import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { useHistory } from "react-router-dom";

const PenggunaDetail = (props) => {
  const [pengguna, setPengguna] = useState({});
  const [cuti, setCuti] = useState({});
  const history = useHistory();

  const thisYear = new Date().getFullYear().toString();

  useEffect(() => {
    if (props.penggunaKey === "") {
      handleBack();
    } else {
      setPengguna({ ...props.penggunaList[props.penggunaKey] });
      db.ref(`cuti`)
        .child(props.penggunaKey)
        .child(thisYear)
        .once("value", (snapshot) => {
          if (snapshot.val() != null) {
            setCuti({
              cutiTahunan: snapshot.val().cutiTahunan,
              cutiHamil: snapshot.val().cutiHamil,
            });
          }
        });
    }
  }, [props.penggunaKey]);

  const handleBack = () => {
    props.backAction();
    history.push("/pengguna");
  };

  return (
    <div className="fadeIn">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Detail Pengguna</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 h6">NIP</div>
            <div className="col-md-9 h6">: {pengguna.nip}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Nama</div>
            <div className="col-md-9 h6">: {pengguna.nama}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Jenis Kelamin</div>
            <div className="col-md-9 h6">: {pengguna.jenisKelamin}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">No. Telp</div>
            <div className="col-md-9 h6">: {pengguna.telepon}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Email</div>
            <div className="col-md-9 h6">: {pengguna.email}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Jabatan</div>
            <div className="col-md-9 h6">: {pengguna.jabatan}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Role</div>
            <div className="col-md-9 h6">: {pengguna.role}</div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Sisa Cuti Tahunan</div>
            <div className="col-md-9 h6">
              : {cuti.cutiTahunan ? cuti.cutiTahunan + " hari" : "-"}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 h6">Sisa Cuti Melahirkan</div>
            <div className="col-md-9 h6">
              : {cuti.cutiHamil ? cuti.cutiHamil + " hari" : "-"}
            </div>
          </div>
          <button
            onClick={() => handleBack()}
            type="button"
            className="btn btn-sm btn-outline-primary mt-3"
          >
            <i className="fa fa-chevron-left mr-2"></i>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenggunaDetail;
