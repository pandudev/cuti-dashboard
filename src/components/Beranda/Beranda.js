import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../services/firebase";

const Beranda = ({ penggunaList }) => {
  const [pengajuan, setpengajuan] = useState({});
  useEffect(() => {
    db.ref("pengajuan").on("value", (snapshot) => {
      setpengajuan(snapshot.val());
    });
  }, []);
  return (
    <div className="pt-3 pb-2 mb-3 fadeIn">
      <div class="jumbotron jumbotron-fluid">
        <div class="container px-5">
          <h1 class="display-4">Selamat Datang</h1>
          <p class="lead">
            Halaman dashboard untuk manajemen pengguna / pegawai dan laporan
            cuti.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">PENGAJUAN</h5>
              <h1>{Object.keys(pengajuan).length}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">DITERIMA</h5>
              <h1>
                {
                  Object.values(pengajuan).filter(
                    (x) => x.statusCuti == "diterima"
                  ).length
                }
              </h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">DITOLAK</h5>
              <h1>
                {
                  Object.values(pengajuan).filter(
                    (x) => x.statusCuti == "ditolak"
                  ).length
                }
              </h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">TOTAL PEGAWAI</h5>
              <h1>{Object.keys(penggunaList).length}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
