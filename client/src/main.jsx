import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("main working");
 
root.render(<RouterProvider  basename={"/"} router={router}/>);


