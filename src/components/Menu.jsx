import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import firebase from "firebase/app";
import { useState } from "react";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    padding: "10px",
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
}));

const Menu = (props) => {
  const [auth, setAuth] = useState(true);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("logged In");
      if (!user) {
        setLogin(
          <Button color="inherit">
            <Link className={classes.link} to="/Login">
              Login
            </Link>
          </Button>
        );
      } else {
        setLogin(
          <Button color="inherit" onClick={() => firebase.auth().signOut()}>
            Sign out
          </Button>
        );
      }
      setAuth(true);
    });
  }, [firebase]);
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Home
            </Link>
            <Link className={classes.link} to="/Add">
              Add
            </Link>
          </Typography>

          {login}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
