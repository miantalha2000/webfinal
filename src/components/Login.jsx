import React from "react";
import "../config/firbase-config";
import firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

import { Redirect, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
var history;
function Login(props) {
  history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(firebase.auth().currentUser ?? null);
  }, []);
  return (
    <div>
      {!user ? (
        <>
          <h1>Login</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="email" label="Email" />
            <TextField type="password" id="pass" label="Password" />
            <Button variant="contained" onClick={() => handleLogin()}>
              Login
            </Button>
          </form>
        </>
      ) : (
        <h1>Logged In</h1>
      )}
    </div>
  );
}
const handleLogin = () => {
  var email = document.getElementById("email").value;

  var password = document.getElementById("pass").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);

      <Redirect to="/" />;
    })
    .catch((user) => {
      if (
        user.message !=
        "The email address is already in use by another account."
      )
        alert(user.message);
      else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user);
            history.push("/");
          })
          .catch((user) => {
            alert(user.message);
          });
      }
    });
};
export default Login;
