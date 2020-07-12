import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import Beranda from "./components/Beranda/Beranda";
import Laporan from "./components/Laporan/Laporan";
import Pengguna from "./components/Pengguna/Pengguna";
import PenggunaForm from "./components/Pengguna/PenggunaForm";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import firebaseDb from "./firebase";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const App = () => {
  const [penggunaList, setpenggunaList] = useState({});
  const [penggunaId, setPenggunaId] = useState("");

  const submitAction = (obj) => {
    if (penggunaId == "") {
      firebaseDb.child("pengguna").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          NotificationManager.success("Data pengguna telah disimpan");
        }
      });
    } else {
      firebaseDb.child(`pengguna/${penggunaId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          NotificationManager.success("Data pengguna telah disimpan");
          setPenggunaId("");
        }
      });
    }
  };

  const editAction = (id) => {
    setPenggunaId(id);
  };

  const deleteAction = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      firebaseDb.child(`pengguna/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          NotificationManager.success("Data pengguna telah dihapus");
        }
      });
    }
  };

  const backAction = () => {
    setPenggunaId("");
  };

  useEffect(() => {
    firebaseDb.child("pengguna").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setpenggunaList({
          ...snapshot.val(),
        });
      } else {
        setpenggunaList(null);
      }
    });
  }, []);

  return (
    <Router>
      <NotificationContainer />
      <Navbar />
      <div className="container-fluid">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Switch>
            <Route
              path="/pengguna"
              exact
              component={() => (
                <Pengguna {...{ penggunaList, editAction, deleteAction }} />
              )}
            />
            <Route
              path="/pengguna/form"
              component={() => (
                <PenggunaForm
                  {...{ penggunaId, submitAction, backAction, penggunaList }}
                />
              )}
            />
            <Route path="/laporan" component={Laporan} />
            <Route path="/" exact component={Beranda} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
