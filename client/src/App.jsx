

import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx"


function App() {
 
const ServerUrl= "http://localhost:7153";

console.log("app",ServerUrl);
  return (
    <div className="App">
     
     <Header url = {ServerUrl}/>
   
     <Outlet context={{ServerUrl}}/>

</div>
  )
}

export default App
