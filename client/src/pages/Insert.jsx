

import DataEntry from "../components/dataEntry.jsx";

import { styFrmStr } from "../assets/styleToObject.js";
import { useOutletContext } from "react-router-dom";



export default function Insert() {
  const  {ServerUrl} = useOutletContext()
  console.log("urlcontext",ServerUrl);

  return (
    <>
  <div className="mx-auto" style={styFrmStr("width: 400px;")}>
 
  <DataEntry urlD = {ServerUrl}/>
</div>

  <><h1>  </h1></>
  
    </>
  );
}