import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import firebase from "firebase";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Matches(props) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setRows([]);
    const data = firebase.firestore().collection("matches");
    data.onSnapshot(async (snapshot) => {
      if (snapshot.size) {
        const row = await firebase.firestore().collection("matches").get();
        setRows(
          row.docs.map((docc, index) => {
            console.log(docc.data());
            const doc = docc.data();
            return (
              <>
                <TableRow key={index}>
                  <TableCell align="right">{doc.TeamA}</TableCell>
                  <TableCell align="right">{doc.TeamB}</TableCell>
                  <TableCell align="right">{doc.date}</TableCell>
                  <TableCell align="right">{doc.city}</TableCell>
                </TableRow>
              </>
            );
          })
        );
      }
    });
  }, []);
  return (
    <div>
      <h1>Matches</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Team A</TableCell>
              <TableCell align="right">Team B</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Matches;
