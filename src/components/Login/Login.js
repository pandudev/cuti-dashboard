import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { signIn } from "../../services/authService";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import styled from "styled-components";
import { db } from "../../services/firebase";
import { auth } from "firebase";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Wrapper = styled.div`
  height: 100vh;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
`;

const Button = styled.button`
  margin-top: 1rem;
  font-weight: 700;
  height: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  /*background-color: #4d90fe; */
  background-color: rgb(104, 145, 162);
  /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
  padding: 0px;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;

  &:hover,
  &:active,
  &:focus {
    background-color: rgb(12, 97, 33);
  }
`;

const ReAuth = styled.span`
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const Card = styled.div`
  max-width: 350px;
  padding: 40px 40px;
  background-color: #f7f7f7;
  /* just in case there no content*/
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
`;

const ProfileName = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  min-height: 1em;
`;

const FormSignin = styled.form`
  &#inputEmail,
  &#inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
  }

  &input[type="email"],
  &input[type="password"],
  &input[type="text"],
  &button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

const FormControl = styled.input`
  font-size: 16px;
  margin: 10px 0 0;
  min-height: 1em;

  &:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
  }
`;

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signIn(email.value, password.value);
        db.ref("pengguna")
          .orderByChild("email")
          .equalTo(email.value)
          .once("value", (snapshot) => {
            snapshot.forEach((row) => {
              if (row.val().role == "pegawai") {
                auth().signOut();
                NotificationManager.error(
                  "Hanya HRD dan Direktur yang berhak akses website ini."
                );
              } else {
                NotificationManager.success(
                  "Selamat Datang, " + row.val().nama.toUpperCase()
                );
                history.push("/");
              }
            });
          });
      } catch (error) {
        NotificationManager.error("Login gagal!");
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <NotificationContainer />
      <div className="container d-flex fadeIn">
        <Card>
          <ProfileImage
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <ProfileName id="profile-name"></ProfileName>
          <FormSignin autoComplete="off" onSubmit={handleLogin}>
            <ReAuth id="reauth-email"></ReAuth>
            <FormControl
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
            <FormControl
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required
            />
            <Button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </Button>
          </FormSignin>
        </Card>
      </div>
    </Wrapper>
  );
};

export default withRouter(Login);
