import React, { useEffect, useState } from "react";
import { db } from "./../../services/firebase";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./Report";

const Laporan = () => {
  const [pengajuanList, setPengajuanList] = useState({});
  const [penggunaList, setpenggunaList] = useState({});
  const [initialList, setinitialList] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [showDataList, setshowDataList] = useState([]);

  const [hrd, sethrd] = useState("");
  const [dir, setdir] = useState("");

  const [loadData, setLoadData] = useState(false);

  function calculateBusinessDays(startDate, endDate) {
    let workDays = 0;
    let currentDay = moment(startDate);
    let endDay = moment(endDate);

    while (currentDay.isBefore(endDay)) {
      if (currentDay.day() != 0) {
        workDays++;
      }
      currentDay.add(1, "day");
    }
    return workDays;
  }

  // set pengguna
  useEffect(() => {
    setLoadData(true);
    db.ref("pengguna").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setpenggunaList({
          ...snapshot.val(),
        });
      } else {
        setpenggunaList(null);
      }
    });
    // // console.log("set pengguna list");
  }, []);

  // set direksi & hrd
  useEffect(() => {
    db.ref("pengguna")
      .orderByChild("role")
      .once("value", (snap) => {
        snap.forEach((row) => {
          if (row.val().role == "admin" && row.val().jabatan == "HRD") {
            sethrd(row.val().nama);
          }

          if (row.val().role == "direktur") {
            setdir(row.val().nama);
          }
        });
      });
    // console.log("set dir & hrd");
  }, []);

  //set pengajuan list
  useEffect(() => {
    db.ref("pengajuan").on("value", (snapshot) => {
      setPengajuanList({
        ...snapshot.val(),
      });
    });
    // console.log("set pengajuan list");
  }, [penggunaList, setpenggunaList]);

  //set initial data
  useEffect(() => {
    if (pengajuanList != null) {
      let list = [];
      Object.keys(pengajuanList).map((key, i) => {
        if (pengajuanList[key].statusCuti != "menunggu konfirmasi") {
          let data = {};
          data.id = key;
          data.tahunCuti = pengajuanList[key].tahunCuti;
          data.tanggalPengajuan = new Date(pengajuanList[key].tanggalPengajuan);
          data.tanggalMulaiCuti = new Date(pengajuanList[key].tanggalMulaiCuti);
          data.tanggalSelesaiCuti = new Date(
            pengajuanList[key].tanggalSelesaiCuti
          );
          data.jenisCuti = pengajuanList[key].jenisCuti;
          data.keterangan = pengajuanList[key].keterangan;
          data.statusCuti = pengajuanList[key].statusCuti;
          data.penggunaId = pengajuanList[key].penggunaId;
          data.nama = penggunaList[data.penggunaId]?.nama;
          data.nip = penggunaList[data.penggunaId]?.nip;
          data.email = penggunaList[data.penggunaId]?.email;
          data.jenisKelamin = penggunaList[data.penggunaId]?.jenisKelamin;
          data.jabatan = penggunaList[data.penggunaId]?.jabatan;
          data.role = penggunaList[data.penggunaId]?.role;
          data.lamaCuti = calculateBusinessDays(
            new Date(pengajuanList[key].tanggalMulaiCuti),
            new Date(pengajuanList[key].tanggalSelesaiCuti)
          );
          // data.lamaCuti = moment(
          //   new Date(pengajuanList[key].tanggalSelesaiCuti)
          // ).diff(new Date(pengajuanList[key].tanggalMulaiCuti), "days");
          list.push(data);
        }
      });
      setinitialList(list);
    }
    // console.log("set initial list");
  }, [pengajuanList, setPengajuanList]);

  // set data list, initial list, and show data list
  useEffect(() => {
    let dataByYear = [];
    let list = [];
    const years = [...new Set(initialList.map((data) => data.tahunCuti))];
    years.map((y) => {
      dataByYear = initialList.filter((d) => d.tahunCuti == y);
      let tahunList = {
        tahun: y,
        data: dataByYear
          .slice()
          .sort((a, b) => a.tanggalPengajuan - b.tanggalPengajuan),
      };
      list.push(tahunList);
    });

    setdataList(list);
    setshowDataList(list);
    setTimeout(() => {
      setLoadData(false);
    }, 1000);
    // console.log("set data list & show data list");
  }, [initialList, setinitialList]);

  const monthFilter = (e) => {
    let newData = JSON.parse(JSON.stringify(dataList));
    if (e.target.value != "reset") {
      newData[e.target.id].data = newData[e.target.id].data.filter(
        (x) => moment(x.tanggalPengajuan).month() == e.target.value
      );
    }

    setshowDataList(newData);

    // console.log("set show data list on month select");
  };

  const handleSearch = (e) => {
    let newData = JSON.parse(JSON.stringify(dataList));
    newData[e.target.id].data = newData[e.target.id].data.filter((x) =>
      x.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setshowDataList(newData);
    // console.log("set show data list on searh");
  };

  return (
    <>
      <div className="pt-3 pb-2 mb-3 fadeIn">
        <div className="accordion" id="accordion">
          {!loadData ? (
            showDataList.length > 0 ? (
              Object.keys(showDataList).map((key) => {
                return (
                  <div className="card" key={key}>
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#collapse${key}`}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <i className="fa fa-file-alt mr-2"></i>
                          Laporan Data Cuti Karyawan {showDataList[key].tahun}
                        </button>
                      </h2>
                    </div>

                    <div
                      id={`collapse${key}`}
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                          <div className="header-tools d-flex">
                            <select
                              className="custom-select mr-2"
                              id={key}
                              onChange={monthFilter}
                            >
                              <option value="reset" defaultValue>
                                Semua
                              </option>
                              <option value="0">Januari</option>
                              <option value="1">Februari</option>
                              <option value="2">Maret</option>
                              <option value="3">April</option>
                              <option value="4">Mei</option>
                              <option value="5">Juni</option>
                              <option value="6">Juli</option>
                              <option value="7">Agustus</option>
                              <option value="8">September</option>
                              <option value="9">Oktober</option>
                              <option value="10">November</option>
                              <option value="11">Desember</option>
                            </select>
                            <div className="input-group flex-nowrap search-bar">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="addon-wrapping"
                                >
                                  <i className="fa fa-search"></i>
                                </span>
                              </div>
                              <input
                                id={key}
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
                                <th>No</th>
                                <th>Tgl. Pengajuan</th>
                                <th>Tgl. Cuti</th>
                                <th>Jenis Cuti</th>
                                <th>Jumlah Cuti</th>
                                <th>Nama</th>
                                <th>NIP</th>
                                <th>Jenis Kelamin</th>
                                <th>Jabatan</th>
                                <th>Keterangan</th>
                                <th>Status Cuti</th>
                                <th>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.values(showDataList[key].data).length >
                              0 ? (
                                Object.values(showDataList[key].data).map(
                                  (obj, i) => {
                                    return (
                                      <tr key={obj.id}>
                                        <td>{i + 1}</td>
                                        <td>
                                          {moment(obj.tanggalPengajuan).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          {moment(obj.tanggalMulaiCuti).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>{obj.jenisCuti}</td>
                                        <td>{obj.lamaCuti}</td>

                                        <td>{obj.nama}</td>
                                        <td>{obj.nip}</td>
                                        <td>{obj.jenisKelamin}</td>
                                        <td>{obj.jabatan}</td>
                                        <td>{obj.keterangan}</td>
                                        <td>{obj.statusCuti}</td>
                                        <td>
                                          {obj.statusCuti == "diterima" ? (
                                            <div>
                                              <PDFDownloadLink
                                                document={
                                                  <Report
                                                    data={obj}
                                                    hrd={hrd}
                                                    dir={dir}
                                                  />
                                                }
                                                fileName="report.pdf"
                                              >
                                                {({
                                                  blob,
                                                  url,
                                                  loading,
                                                  error,
                                                }) =>
                                                  loading ? (
                                                    "Loading document..."
                                                  ) : (
                                                    <span>
                                                      <i className="fa fa-print mr-2"></i>
                                                      Print
                                                    </span>
                                                  )
                                                }
                                              </PDFDownloadLink>
                                            </div>
                                          ) : (
                                            <p className="text-center">-</p>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              ) : (
                                <tr>
                                  <td colSpan="12" className="text-center">
                                    Tidak ada data
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Belum ada data cuti</p>
            )
          ) : (
            <p>Mohon tunggu</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Laporan;
