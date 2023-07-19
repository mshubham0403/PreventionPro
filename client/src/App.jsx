

import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

import { useState } from "react";


function App() {
 
const ServerUrl= 
process.env.NODE_ENV === "production"
  ? "https://preventionpro.onrender.com"
  : "http://localhost:7153";
const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div className="App">
     
     <Header url = {ServerUrl} log={isLoggedIn} setLog={setIsLoggedIn}/>
   
     <Outlet context={{ServerUrl,isLoggedIn,setIsLoggedIn}}/>

</div>
  )
}

export default App
