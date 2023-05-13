import express from "express";
import mongoose from "mongoose";
import http from "http";

// import router from "./api/routes.js";
import DailyLogDB from "./models/DailyLog.js";
import HospitalDB from "./models/Hospital.js";
import DiseaseDB from "./models/Disease.js";

import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { userInfo } from "os";

await mongoose.connect(
  "mongodb+srv://mshubham:healthcare2023@clusterh.ilp8ion.mongodb.net/?retryWrites=true&w=majority"
);
if (
  mongoose.connect(
    "mongodb+srv://mshubham:healthcare2023@clusterh.ilp8ion.mongodb.net/?retryWrites=true&w=majority"
  )
) {
  console.log("connected to mongoose");
}
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

// const Diseases = ["ulcer", "piles", "constipation"];
// const Hospitals = [
//   { hospitalName: "hos1", hospitalId: "dcw2" },
//   { hospitalName: "hos2 1", hospitalId: "de2" },
// ];
//GET---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

app.get("/hospitals", async (req, res) => {
  const hosps = await HospitalDB.find();

  res.json(hosps);
});
app.get("/diseases", async (req, res) => {
  const Diseaselist = await DiseaseDB.find();
  // res.json(Diseases);
  res.json(Diseaselist);
});
app.get("/dailylog", async (req, res) => {
  const dailyLoglist = await DailyLogDB.find();

  res.json(dailyLoglist);
});

//POST---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

//Add hospitals---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

app.post("/hospitals", async (req, res) => {
  console.log("request reached", req.body.hospitalName);
  const chkobj = await HospitalDB.find({
    hospitalName: req.body.hospitalName,
  }).count();

  if (chkobj != 0) {
    res.status(201).send("hosp is in list");
  } else {
    try {
      const hosp = {
        hospitalName: req.body.hospitalName,

        hospitalId: req.body.hospitalId,
      };
      const hospObj = new HospitalDB(hosp);
      await hospObj.save();
      res.status(201).send("hospital added ,name :");
      console.log("hosp added");
    } catch {
      res.status(500).send("error occurred");
      console.log("hosp error");
    }
  }
});
//Disease=======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.post("/diseases", async (req, res) => {
  console.log("request reached", req.body.diseaseName);
  const chkobj = await DiseaseDB.find({
    diseaseName: req.body.diseaseName,
  }).count();

  if (chkobj != 0) {
    res.status(201).send("disease already exists");
  } else {
    try {
      const disp= {
        diseaseName: req.body.diseaseName,

        diseaseId: req.body.diseaseId,
      };
      const dispObj = new DiseaseDB(disp);
      await dispObj.save();
      res.status(201).send(disp);
      console.log("disp added");
    } catch {
      res.status(500).send("error occurred");
      console.log("disp error");
    }
  }
});

//Daily logs=======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


app.post("/dailylog", async (req, res) => {
  console.log("reqest for adding log reachd the server");

  try {
    const logToday = req.body;

    console.log("log to be added", logToday);

    logToday.arrDiseasesCases.map((disease) => {
      const eachDiseaseEntry = {
        diseaseName: disease.disease,
        diseaseId: disease.diseaseId,
        diseaseCases:disease.cases,
        hospitalName: logToday.hospitalName,
        hospitalId: logToday.hospitalId,
        date: disease.dateAdded,
        user: disease.userThatAdded,
      };
      const dailylogEntry = new DailyLogDB(eachDiseaseEntry);
      dailylogEntry.save();
    });
    res.status(200).send("the daily entry is added");

    
  } catch {
    res.status(500).send("error occurred");
    console.log("log addition error");
  }
});

httpserver.listen(PORT, function () {
  console.log("The server is up and running at", PORT, ":)");
});
