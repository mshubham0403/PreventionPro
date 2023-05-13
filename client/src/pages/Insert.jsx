import React, { useState } from "react";
import DataEntry from "../components/dataEntry.jsx";
import Login from "../components/login.jsx";
import { styFrmStr } from "../assets/styleToObject.js";
import { useOutletContext } from "react-router-dom";

export default function Insert() {
  const { ServerUrl } = useOutletContext();
  const { isLoggedIn } = useOutletContext();
  const { setIsLoggedIn } = useOutletContext();
  

  const handleLogin = () => {
   
    setIsLoggedIn(prev=>true);
  };

 
  const handleLogout = () => {
   
    setIsLoggedIn(prev=>false);
  };

  console.log("urlcontext", ServerUrl);

  return (
    <>
      {isLoggedIn ? (
        <div className="mx-auto" style={styFrmStr("width: 400px;")}>
          <DataEntry urlD={ServerUrl} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      // <h1>lo</h1>
      )}
    </>
  );
}
