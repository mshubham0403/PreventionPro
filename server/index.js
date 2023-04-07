import express from "express";
import mongoose from "mongoose";
import http from "http";


// import router from "./api/routes.js";

import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { userInfo } from "os";

await mongoose.connect(
  "mongodb+srv://mshubham:healthcare2023@clusterh.ilp8ion.mongodb.net/?retryWrites=true&w=majority" );

const app = express();
const httpserver = http.createServer(app);
// const io = new Server(httpserver, { cors: ["*"] });
const PORT = process.env.PORT || 7153;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.use(express.json());
app.use(cors());

const Diseases = ["ulcer", "piles","constipation"]
const Hospitals = [{ hospitalName: "hos1",hospitalId: "dcw2" },{ hospitalName: "hos2 1",hospitalId: "de2" }];
//GET---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

app.get("/hospitals", async (req, res) => {
  
  res.json( Hospitals );
});
app.get("/diseases", async (req, res) => {
  
  res.json(Diseases) ;
});


//POST---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>




//Add hospitals---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

app.post("/hospitals", async (req, res) => {
  console.log("request reached",req.hospitalName);
  const chkobj = Hospitals.find((hos)=>(hos.hospitalName===req.body.hospitalName))

  if (chkobj != null) {
    res.status(201).send("hosp is in list");
  } else {
    try {
     

      const hosp = {
        hospitalName: req.body.hospitalName,
  
        hospitalId:req.body.hospitalId,
      };
Hospitals.push(hosp);
      res.status(201).send(hosp);
      console.log("hosp added")
    } catch {
      res.status(500).send("error occurred");
      console.log("hosp error");
    }
  }
});

//Daily logs=======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.post("/dailylog", async (req, res) => {
  console.log("reqest for adding log reachd the server");

  

  
    try {
      const logToday = {hospitalName:req.body.hospitalName,hospitalId:req.body.hospitalId,arrDiseasesCases:req.body.arrDiseasesCases,date:req.body.date,user:req.body.user};
     
      console.log("log to be added",logToday)
      const allEntries =[]
      logToday.arrDiseasesCases.map((disease)=>{
       const eachDiseaseEntry = {diseaseName:disease.disease, diseaseId:disease.diseaseId,hospitalName:logToday.hospitalName,
      hospitalId:logToday.hospitalId,
      dateAdded:disease.dateAdded,
      user:disease.userThatAdded}
    
    allEntries.push(eachDiseaseEntry);
  })
  res.status(200).send("daily log added")
  console.log("the entries created",allEntries)
      console.log("logday added", logToday);
    }
    catch {
      res.status(500).send("error occurred")
      console.log("logging error");
    }
  
});



httpserver.listen(PORT, function () {
  console.log("The server is up and running at", PORT, ":)");
});
