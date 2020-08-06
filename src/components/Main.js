import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";

import { signUp } from "../services/authService";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import PenggunaForm from "./Pengguna/PenggunaForm";
import PenggunaDetail from "./Pengguna/PenggunaDetail";
import Laporan from "./Laporan/Laporan";
import Pengguna from "./Pengguna/Pengguna";
import Beranda from "./Beranda/Beranda";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { db, auth, secondaryApp } from "../services/firebase";
import { AuthContext } from "../AuthContext";

const Main = ({ history }) => {
  const [penggunaList, setpenggunaList] = useState({});
  const [penggunaKey, setPenggunaKey] = useState("");
  const [cUser, setCUser] = useState({});

  const thisYear = new Date().getFullYear().toString();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    Object.keys(penggunaList).forEach((key) => {
      db.ref("cuti")
        .child(key)
        .child(thisYear)
        .on("value", (snapshot) => {
          if (snapshot.val() == null && penggunaList[key].role != "direktur") {
            db.ref("cuti")
              .child(key)
              .child(thisYear)
              .set(
                {
                  cutiTahunan: 12,
                  cutiHamil:
                    penggunaList[key].jenisKelamin == "perempuan" ? 90 : 0,
                },
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
          }
        });
    });
  }, [penggunaList]);

  useEffect(() => {
    db.ref("pengguna").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setpenggunaList({
          ...snapshot.val(),
        });

        if (currentUser != null) {
          snapshot.forEach((row) => {
            if (row.key == currentUser.uid) {
              setCUser(row.val());
            }
          });
        }
      } else {
        setpenggunaList(null);
      }
    });
  }, []);

  const submitAction = async (pengguna) => {
    if (penggunaKey == "") {
      await secondaryApp
        .auth()
        .createUserWithEmailAndPassword(pengguna.email, pengguna.password)
        .catch((reason) => {
          NotificationManager.error(reason.message);
        })
        .finally((val) => {
          if (val != undefined) {
            pengguna.password = null;
            db.ref("pengguna")
              .child(val.user.uid)
              .set(pengguna, (err) => {
                if (err) {
                  console.log(err);
                  NotificationManager.error("Data pengguna gagal disimpan");
                } else {
                  NotificationManager.success("Data pengguna telah disimpan");
                  if (pengguna.role != "direktur") {
                    db.ref("cuti")
                      .child(val.user.uid)
                      .child(new Date().getFullYear().toString())
                      .set(
                        {
                          cutiTahunan: 12,
                          cutiHamil:
                            pengguna.jenisKelamin == "perempuan" ? 90 : 0,
                        },
                        (err) => {
                          if (err) {
                            console.log(err);
                            NotificationManager.error(
                              "Data cuti gagal disimpan"
                            );
                          } else {
                            NotificationManager.success(
                              "Data cuti telah disimpan"
                            );
                          }
                        }
                      );
                  }
                }
              });
          }
        });
    } else {
      db.ref(`pengguna/${penggunaKey}`).set(pengguna, (err) => {
        if (err) {
          console.log(err);
        } else {
          NotificationManager.success("Data pengguna telah disimpan");
          setPenggunaKey("");
        }
      });
    }
  };

  const editAction = (key) => {
    setPenggunaKey(key);
  };

  const detailAction = (key) => {
    setPenggunaKey(key);
  };

  const deleteAction = (key) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      db.ref("pengguna")
        .child(key)
        .remove((err) => {
          if (err) {
            console.log(err);
          } else {
            db.ref("cuti")
              .child(key)
              .remove((err) => {
                if (err) {
                  console.log(err);
                } else {
                  NotificationManager.success("Data pengguna telah dihapus");
                }
              });
          }
        });
    }
  };

  const backAction = () => {
    setPenggunaKey("");
  };

  if (currentUser == null) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <NotificationContainer />
      <Navbar user={cUser} />
      <div className="container-fluid">
        <Sidebar user={cUser} />

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <Beranda
                  {...{
                    penggunaList,
                  }}
                />
              )}
            />
            <Route
              path="/pengguna"
              exact
              component={() => (
                <Pengguna
                  {...{
                    penggunaList,
                    editAction,
                    deleteAction,
                    detailAction,
                  }}
                />
              )}
            />
            <Route
              path="/pengguna/form"
              component={() => (
                <PenggunaForm
                  {...{
                    penggunaKey,
                    submitAction,
                    backAction,
                    penggunaList,
                    NotificationManager,
                  }}
                />
              )}
            />
            <Route
              path="/pengguna/detail"
              component={() => (
                <PenggunaDetail
                  {...{
                    penggunaKey,
                    penggunaList,
                    backAction,
                  }}
                />
              )}
            />
            <Route path="/laporan" component={Laporan} />
            <Route component={Beranda} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default withRouter(Main);
