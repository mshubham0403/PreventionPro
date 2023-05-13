import { v4 as uuidv4 } from "uuid";

// import router from "./api/routes.js";
import DailyLogDB from "./models/DailyLog.js";
import HospitalDB from "./models/Hospital.js";
import DiseaseDB from "./models/Disease.js";
import UserDb from "./models/User.js";

export async function  addHospitals(){
    const hospitals = [
      "Shree Ambey hospital",
      "J L N Hospital & Research Centre",
      "Dhanwantari Hospital",
      "Sector 9 Hospital",
      "SBS HOSPITAL",
      "JLN BSP MAIN HOSPITAL",
      "Bhilai Gayatri Hospital",
      "Jankalyan Hospital",
      "Mittal Hospital",
      "Vayam Hospital"
    ];
  
    for (const hospitalName of hospitals) {
    const chkobj = await HospitalDB.find({
      hospitalName: hospitalName,
    }).count();
  
    if (chkobj != 0) {
      res.status(201).send("hosp is in list");
    } else {
      try {
       
          const chkobj = await HospitalDB.find({ hospitalName }).count();
    
          if (chkobj !== 0) {
            console.log(`Hospital ${hospitalName} is already in the list`);
          } else {
            const hospitalId = uuidv4();
            const hosp = {
              hospitalName:hospitalName,
              hospitalId:hospitalId
            };
            const hospObj = new HospitalDB(hosp);
            await hospObj.save();
            console.log(`Hospital added: Name: ${hospitalName}, ID: ${hospitalId}`);
          }
        }
       catch (error) {
        console.log("Error occurred while adding hospitals:", error);
      }
    }
  
  }
  }
  
 export  async function  addDisease(){
   
    const diseases = [
      "Malaria",
      "Dengue",
      "Typhoid",
      "Chikungunya",
      "Influenza",
      "Tuberculosis",
      "Piles",
      "Constipation",
      "Ulcer",
      "Hypertension",
      "Gastroenteritis",
      "Pneumonia",
      "Cholera",
      "Meningitis",
      "Hepatitis",
      "Jaundice",
      "Asthma",
      "Migraine",
      "Arthritis",
      "Allergies",
      "Bronchitis",
      "Common Cold"
    ];
    const diseaseLinks = [
      "https://www.who.int/health-topics/malaria",
      "https://www.who.int/health-topics/dengue",
      "https://www.who.int/health-topics/typhoid-fever",
      "https://www.who.int/health-topics/chikungunya",
      "https://www.who.int/health-topics/influenza",
      "https://www.who.int/health-topics/tuberculosis",
      "https://www.who.int/health-topics/piles",
      "https://www.who.int/health-topics/constipation",
      "https://www.who.int/health-topics/ulcer",
      "https://www.who.int/health-topics/hypertension",
      "https://www.who.int/health-topics/gastroenteritis",
      "https://www.who.int/health-topics/pneumonia",
      "https://www.who.int/health-topics/cholera",
      "https://www.who.int/health-topics/meningitis",
      "https://www.who.int/health-topics/hepatitis",
      "https://www.who.int/health-topics/jaundice",
      "https://www.who.int/health-topics/asthma",
      "https://www.who.int/health-topics/migraine",
      "https://www.who.int/health-topics/arthritis",
      "https://www.who.int/health-topics/allergies",
      "https://www.who.int/health-topics/bronchitis",
      "https://www.who.int/health-topics/common-cold"
    ];
    for (let i=0;i<diseases.length;i++) {
      const diseaseN =diseases[i]; 
    const chkobj = await DiseaseDB.find({
      diseaseName: diseaseN,
    }).count();
  
    if (chkobj != 0) {
      console.log("disp is in list");
    } else {
      try {
       
          const chkobj = await DiseaseDB.find({ diseaseN }).count();
    
          if (chkobj !== 0) {
            console.log(`Hospital ${diseaseN} is already in the list`);
          } else {
            const diseaseId = uuidv4();
            const hosp = {
              diseaseName:diseaseN,
              diseaseId:diseaseId,
              diseaseLink:diseaseLinks[i]
            };
            const hospObj = new DiseaseDB(hosp);
            await hospObj.save();
            console.log(`Hospital added: Name: ${diseaseN}, ID: ${diseaseId}`);
          }
        }
       catch (error) {
        console.log("Error occurred while adding hospitals:", error);
      }
    }
  
  }
  }
  
  
 export function saveRecords(){
    const diseases = [
      "Malaria",
      "Dengue",
      "Typhoid",
      "Chikungunya",
      "Influenza",
      "Tuberculosis",
      "Diabetes",
      "Hypertension",
      "Gastroenteritis",
      "Pneumonia",
      "Cholera",
      "Meningitis",
      "Hepatitis",
      "Jaundice",
      "Asthma",
      "Migraine",
      "Arthritis",
      "Allergies",
      "Bronchitis",
      "Common Cold"
    ];
    
    const hospitals = [
      "Shree Ambey hospital",
      "J L N Hospital & Research Centre",
      "Dhanwantari Hospital",
      "Sector 9 Hospital",
      "SBS HOSPITAL",
      "JLN BSP MAIN HOSPITAL",
      "Bhilai Gayatri Hospital",
      "Jankalyan Hospital",
      "Mittal Hospital",
      "Vayam Hospital"
    ];
  
    
    const indianDoctorNames = [
      "Dr. Ashok Gupta",
      "Dr. Preeti Sharma",
      "Dr. Rajesh Singh",
      "Dr. Nisha Patel",
      "Dr. Anil Kumar",
      "Dr. Sangeeta Verma",
      "Dr. Ramesh Sharma",
      "Dr. Rekha Gupta",
      "Dr. Sanjay Singh",
      "Dr. Anjali Shah",
      "Dr. Manoj Kapoor",
      "Dr. Meena Patel",
      "Dr. Vikram Verma",
      "Dr. Neha Gupta",
      "Dr. Rajeshwari Sharma",
      "Dr. Sunil Kumar",
      "Dr. Smita Patel",
      "Dr. Harish Singh",
      "Dr. Renu Kapoor",
      "Dr. Arvind Shah",
      "Dr. Priya Sharma",
      "Dr. Deepak Verma",
      "Dr. Pooja Gupta",
      "Dr. Mohan Singh",
      "Dr. Divya Shah",
      "Dr. Amit Kumar"
    ];
    
    const doctors = [];
    const hospitalsCopy = [...hospitals];
  
  // Assign at least one doctor to each hospital
  for (let i = 0; i < hospitals.length; i++) {
    const hospital = hospitalsCopy[i];
    const doctorIndex = Math.floor(Math.random() * indianDoctorNames.length);
    const doctorName = indianDoctorNames[doctorIndex];
  
    doctors.push({
      doctorName,
      hospital
    });
  
    hospitalsCopy.splice(i, 1);
    indianDoctorNames.splice(doctorIndex, 1);
  }
  
  // Assign remaining doctors randomly to the hospitals
  for (let i = 0; i < hospitalsCopy.length; i++) {
    const hospital = hospitalsCopy[i];
    const doctorIndex = Math.floor(Math.random() * indianDoctorNames.length);
    const doctorName = indianDoctorNames[doctorIndex];
  
    doctors.push({
      doctorName,
      hospital
    });
  
    indianDoctorNames.splice(doctorIndex, 1);
  }
    function getRandomDoctorByHospital(hospital) {
      const filteredDoctors = doctors.filter(doctor => doctor.hospital === hospital);
  
      const randomIndex = Math.floor(Math.random() * filteredDoctors.length);;
      return filteredDoctors[randomIndex];
    }
    
    
    
    
    function generateRandomDate(start, end) {
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return randomDate.toISOString().split('T')[0];
    }
    
    async function generateRecords() {
      for (let i = 0; i < 1000; i++) {
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function delayedFunction() {
          console.log("Before sleep");
          await sleep(2000); // Sleep for 2 seconds (2000 milliseconds)
          console.log("After sleep");
        }
        const disease = diseases[Math.floor(Math.random() * diseases.length)];
        const Cases = Math.floor(Math.random() * (400 - 30 + 1)) + 30;
        const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
        const randomDate = generateRandomDate(new Date(2020, 0, 1), new Date(2023, 3, 30));
        const diseaseObj = await DiseaseDB.findOne({ diseaseName:disease });
        const hospObj = await HospitalDB.findOne({ hospitalName: hospital });
        const randomDoctor = getRandomDoctorByHospital(hospital);
        delayedFunction();
     try{
        const eachDiseaseEntry = {
          diseaseName: disease,
          diseaseId: diseaseObj.diseaseId ,
          diseaseCases:Cases,
          hospitalName: hospital,
          hospitalId: hospObj.hospitalId,
          date: randomDate,
          user:randomDoctor.doctorName
        };
        const dailylogEntry = new DailyLogDB(eachDiseaseEntry);
        dailylogEntry.save();
        console.log(eachDiseaseEntry);
        
      
      console.log("the daily entry is added");
  
     
      
      delayedFunction();
      
    } catch {
      
      console.log("log addition error");
    }
      }
        // Save the record to the database
        // Your code to save the record goes here
        // Replace the console.log statement with your database save logic
        // console.log(`Date: ${randomDate}, Disease: ${disease}, Cases: ${numCases}, Hospital: ${hospital}`);
    }
    
    generateRecords();
  }
  