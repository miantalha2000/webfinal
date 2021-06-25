import React, { useState } from "react";
import { Button, hslToRgb } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useEffect } from "react";
var history;
const Add = (props) => {
  history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) setUser(null);
    });
    setUser(firebase.auth().currentUser ?? null);
  }, []);
  return (
    <div>
      {user ? (
        <>
          {user.email == "miantalhaa147@gmail.com" ? (
            <>
              <h1>Add new matches</h1>
              <div style={{ margin: "10px" }}>
                <TextField
                  style={{ margin: "10px" }}
                  id="TeamA"
                  label="Team A"
                />

                <TextField
                  style={{ margin: "10px" }}
                  id="TeamB"
                  label="Team B"
                />

                <TextField style={{ margin: "10px" }} id="Date" label="Date" />

                <TextField style={{ margin: "10px" }} id="City" label="City" />
              </div>
              <Button
                onClick={() => submit()}
                style={{ margin: "10px" }}
                variant="contained"
              >
                Add
              </Button>
            </>
          ) : (
            <h1>Not an admin</h1>
          )}
        </>
      ) : (
        <h1>Login in as an admin</h1>
      )}
    </div>
  );
};
const submit = () => {
  try {
    var ta = document.getElementById("TeamA").value;

    var tb = document.getElementById("TeamB").value;

    var d = document.getElementById("Date").value;

    var c = document.getElementById("City").value;
    if (
      ta == "Lahore Qalanders" ||
      ta == "Peshawar Zalmi" ||
      ta == "Multan Sultans" ||
      ta == "Karachi Kings"
    ) {
      if (
        (tb == "Lahore Qalanders" ||
          tb == "Peshawar Zalmi" ||
          tb == "Multan Sultans" ||
          tb == "Karachi Kings") &&
        tb != ta
      ) {
        firebase
          .firestore()
          .collection("matches")
          .add({ TeamA: ta, TeamB: tb, date: d, city: c });

        history.push("/");
      } else
        alert(
          "Invalis Team B! Must be Lahore Qalanders or Peshawar Zalmi or Multan Sultans or Karachi Kings and not Same as Team A"
        );
    } else
      alert(
        "Invalis Team A! Must be Lahore Qalanders or Peshawar Zalmi or Multan Sultans or Karachi Kings"
      );
  } catch (error) {
    //alert("invalid data");
    alert(error);
  }
};

export default Add;
