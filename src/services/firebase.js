import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCoFMf1pywHUQyDkdpYVhTorNyHn7yHYuI",
  authDomain: "cutiebh-48919.firebaseapp.com",
  databaseURL: "https://cutiebh-48919.firebaseio.com",
  projectId: "cutiebh-48919",
  storageBucket: "cutiebh-48919.appspot.com",
  messagingSenderId: "338337585288",
  appId: "1:338337585288:web:288948110949ba3b09e73d",
  measurementId: "G-E0GH2TM01Q",
};

const oldConfig = {
  apiKey: "AIzaSyDceaTHfJNIrVRHePLxaGt_9c--GttXPFg",
  authDomain: "cuti-request.firebaseapp.com",
  databaseURL: "https://cuti-request.firebaseio.com",
  projectId: "cuti-request",
  storageBucket: "cuti-request.appspot.com",
  messagingSenderId: "129213565390",
  appId: "1:129213565390:web:e05b4f8f9c757f21bd439f",
  measurementId: "G-0243YK0YVY",
};

firebase.initializeApp(oldConfig);
export const secondaryApp = firebase.initializeApp(oldConfig, "secondary");

export const auth = firebase.auth;
export const db = firebase.database();
