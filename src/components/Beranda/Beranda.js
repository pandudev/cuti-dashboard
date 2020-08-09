import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../services/firebase";

const Beranda = ({ penggunaList }) => {
  const [pengajuan, setpengajuan] = useState({});

  useEffect(() => {
    db.ref("pengajuan").on("value", (snapshot) => {
      if (snapshot.numChildren() > 0) {
        setpengajuan(snapshot.val());
      }
    });
  }, []);
  return (
    <div className="pt-3 pb-2 mb-3 fadeIn">
      <div className="jumbotron jumbotron-fluid">
        <div className="container px-5">
          <h1 className="display-4">Selamat Datang</h1>
          <p className="lead">
            Halaman dashboard untuk manajemen pengguna / karyawan dan laporan
            cuti.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">PENGAJUAN</h5>
              <h1>
                {
                  Object.values(pengajuan).filter(
                    (x) => x.statusCuti == "menunggu konfirmasi"
                  ).length
                }
              </h1>
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
              <h5 className="card-title">TOTAL KARYAWAN</h5>
              <h1>{Object.keys(penggunaList).length}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
