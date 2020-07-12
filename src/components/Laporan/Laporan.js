import React from "react";

const Laporan = () => {
  return (
    <div className="pt-3 pb-2 mb-3 fadeIn">
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <i className="fa fa-file-alt mr-2"></i>
                Laporan Data Cuti Karyawan 2019
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <div className="header-tools d-flex">
                  <select className="custom-select mr-2">
                    <option selected>Bulan</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
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
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tgl. Pengajuan</th>
                      <th>Tgl. Cuti</th>
                      <th>Jenis Cuti</th>
                      <th>Jumlah Cuti</th>
                      <th>Nama</th>
                      <th>Jenis Kelamin</th>
                      <th>Jabatan</th>
                      <th>Status Cuti</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fa fa-file-alt mr-2"></i>
                Data Cuti Karyawan 2020
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <div className="header-tools d-flex">
                  <select className="custom-select mr-2">
                    <option selected>Bulan</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
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
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tgl. Pengajuan</th>
                      <th>Tgl. Cuti</th>
                      <th>Jenis Cuti</th>
                      <th>Jumlah Cuti</th>
                      <th>Nama</th>
                      <th>Jenis Kelamin</th>
                      <th>Jabatan</th>
                      <th>Status Cuti</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>xxxxxx</td>
                      <td>
                        <a href="#">
                          <i className="fa fa-print mr-2"></i>Print
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
