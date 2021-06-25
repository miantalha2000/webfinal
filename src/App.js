import React from "react";
import Menu from "./components/Menu";
import Matches from "./components/Matches";
import firebase  from "firebase/app";
import Login from "./components/Login";
import Add from "./components/Add";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [auth,setAuth]= useState(true);
  useEffect(()=>{
firebase.auth().onAuthStateChanged(user=>{
  console.log("logged In")
  setAuth(true)
})
  },[firebase])
  return (
    <Router>
      <div style={{padding:'10px'}}>
        <Menu />
        <Switch>
          <Route path="/" exact component={Matches} />
          <Route path="/Add" component={Add} />
          <Route path="/not-found"  component={NotFound}/>
         <Route path="/login"  component={Login}/>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
