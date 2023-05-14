import express from "express";
import mongoose from "mongoose";
import http from "http";
import bcrypt from "bcrypt";
import predict from "./Ananlysis/prediction.js";

// import {} from "../server/preProcess/fetchGatherData.js";
// import router from "./api/routes.js";
import DailyLogDB from "./models/DailyLog.js";
import HospitalDB from "./models/Hospital.js";
import DiseaseDB from "./models/Disease.js";
import UserDb from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { userInfo } from "os";
import { log, time } from "console";

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
app.get("/users", async (req, res) => {
  const userArr = await UserDb.find();
  res.json( userArr );
});
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

// app.get("/addhos", async (req, res) => {
//   addHospitals();
//   res.json("done");
// });
// app.get("/adddis", async (req, res) => {
//   addDisease();
//   res.json("done");
// });
// app.get("/addlogs", async (req, res) => {
//   await saveRecords();
//   res.json("adding records");
// });
//POST---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

// Login->>>>>>>------------------------------------------------------------>>>>>>>>>>>>>>>>>>>
app.post("/users/login", async (req, res) => {
  console.log("request sign in");
  const userchk= await UserDb.find({ name: req.body.name }).count();
  const user= await UserDb.find({ name: req.body.name });
  // console.log(user[0]);

  if (userchk == 0) {
    res.status(400).send("Cannot find user");
  } 
  else {
    try {
      if (await bcrypt.compare(req.body.password,user[0].password )) {
        const sentDtaConfirm = {
          userIdSentServer: user[0].userId,
          userNameSentServer: user[0].name,
          status: "Success",
        };
        res.send(sentDtaConfirm);
      } else {
        res.send("User exists password incorrect");
      }
    } catch {
      res.status(500).send("error");
    }
  }
});
//Signup---------------------------------------------------------------->>>>>>>>>=>>>>>>>>>

app.post("/users", async (req, res) => {
  const chkUser = await UserDb.find({ name: req.body.name }).count();

  if (chkUser != 0) {
    res.status(201).send("user already added");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = {
        name: req.body.name,
        password: hashedPassword,
        userId: req.body.userId,
      };

      const userDbObj = new UserDb(user);
      userDbObj.save();
      res.status(201).send("user added");
      console.log("user added", user);
    } catch {
      res.status(500).send("error occurred");
      console.log("user error");
    }
  }
});

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

//get Today=======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.post("/today", async (req, res) => {
  const  date  = req.body.date;
 

  try { console.log(date);
    // Parse the date string to a Date object
    const inputDate = date;
const parts = inputDate.split("/");
const searchDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000+00:00`).toISOString();


    console.log(searchDate);

    // Extract diseases with their information for the given date
    const diseases = await DailyLogDB.find({ date: searchDate }).select(
      "diseaseName diseaseId hospitalName hospitalId"
    );
     console.log(diseases);
     res.json(diseases);
  
 } catch (error) {
    console.error("Error fetching diseases:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/prediction/:month", async (req, res) => {
  const { month } = req.params;
  try {
    if (isNaN(month)) {
      throw new Error("Month is not a number");
    }
    const monthNumber = parseInt(month);

    // Get top 10 disease predictions
    const prediction = await predict(monthNumber);
    setTimeout(() => {
      return res.json({ data: prediction }); 
    },1000);

    
  } catch (err) {
    console.log(err);
    return res.json({ message: "error" });
  }
});

httpserver.listen(PORT, function () {
  console.log("The server is up and running at", PORT, ":)");
});
