import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-notifications/lib/notifications.css";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import { AuthProvider } from "./AuthContext";
import { useEffect } from "react";
import { db, secondaryApp } from "./services/firebase";
import initAdmin from "./initAdmin";

const App = () => {
  const createUser = async () => {
    await secondaryApp
      .auth()
      .createUserWithEmailAndPassword(initAdmin.email, initAdmin.password)
      .then((val) => {
        // await signUp(initAdmin.email, initAdmin.password).then((val) => {
        initAdmin.password = null;
        db.ref("pengguna")
          .child(val.user.uid)
          .set(initAdmin, (err) => {
            if (err) {
              console.log(err);
              // NotificationManager.error("Data pengguna gagal disimpan");
            } else {
              // NotificationManager.success("Data pengguna telah disimpan");
            }
          });

        // var thisYear = new Date().getFullYear().toString();

        // db.ref("cuti")
        //   .child(val.user.uid)
        //   .child(thisYear)
        //   .set(
        //     {
        //       cutiTahunan: initAdmin.role === "direktur" ? null : 12,
        //       cutiHamil:
        //         initAdmin.role !== "direktur" &&
        //         initAdmin.jenisKelamin === "perempuan"
        //           ? 90
        //           : 0,
        //     },
        //     (err) => {
        //       if (err) {
        //         console.log(err);
        //         // NotificationManager.error("Data cuti gagal disimpan");
        //       } else {
        //         // NotificationManager.success("Data cuti telah disimpan");
        //       }
        //     }
        //   );
      });
  };

  const initFunction = async () => {
    db.ref("pengguna")
      .orderByChild("role")
      .equalTo("admin")
      .once("value", (snapshot) => {
        if (snapshot.numChildren() < 1) {
          createUser();
        }
      });
  };

  useEffect(() => {
    initFunction();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route component={Main} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
