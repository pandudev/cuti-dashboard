import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDceaTHfJNIrVRHePLxaGt_9c--GttXPFg",
  authDomain: "cuti-request.firebaseapp.com",
  databaseURL: "https://cuti-request.firebaseio.com",
  projectId: "cuti-request",
  storageBucket: "cuti-request.appspot.com",
  messagingSenderId: "129213565390",
  appId: "1:129213565390:web:e05b4f8f9c757f21bd439f",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
