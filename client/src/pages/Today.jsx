import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Today() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const { ServerUrl } = useOutletContext();
  const [displayOption, setDisplayOption] = useState("hospital");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = formatSelectedDate(selectedDate);
      const response = await axios.post(ServerUrl + "/today", { date: formattedDate });
      setData(response.data);
      console.log("Data received:", response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const formatSelectedDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const getTotalPatients = () => {
    return data.length;
  };

  const getDiseaseWithMaxCases = () => {
    const diseases = {};
    data.forEach((entry) => {
      const { diseaseName } = entry;
      if (!diseases[diseaseName]) {
        diseases[diseaseName] = 0;
      }
      diseases[diseaseName]++;
    });

    let maxCases = 0;
    let diseaseWithMaxCases = "";
    Object.entries(diseases).forEach(([diseaseName, cases]) => {
      if (cases > maxCases) {
        maxCases = cases;
        diseaseWithMaxCases = diseaseName;
      }
    });

    return { disease: diseaseWithMaxCases, cases: maxCases };
  };

  const getDiseasesByHospital = () => {
    const diseasesByHospital = {};
    data.forEach((entry) => {
      const { hospitalName, diseaseName } = entry;
      if (!diseasesByHospital[hospitalName]) {
        diseasesByHospital[hospitalName] = {};
      }
      if (!diseasesByHospital[hospitalName][diseaseName]) {
        diseasesByHospital[hospitalName][diseaseName] = 0;
      }
      diseasesByHospital[hospitalName][diseaseName]++;
    });

    return diseasesByHospital;
  };

  const getDiseasesByMaxCases = () => {
    const diseasesByMaxCases = {};
    data.forEach((entry) => {
      const { diseaseName } = entry;
      if (!diseasesByMaxCases[diseaseName]) {
        diseasesByMaxCases[diseaseName] = 0;
      }
      diseasesByMaxCases[diseaseName]++;
    });

    return diseasesByMaxCases;
  };
  const handleDisplayOptionChange = (option) => {
    setDisplayOption(prev=>option);
  };
  useEffect(() => {
    if (selectedDate !== "") {
      handleSubmit(new Event("submit"));
    }
  }, [selectedDate]);

  return (
    <div className="container" style={{ background: 'linear-gradient(to bottom right, #7ad1f5, #b1e2ff)' }}>
     
    <h2 className="mt-4">Select a Date:</h2>
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-md-2">
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
        </div>
      </div>
    </form>


    {data.length > 0 && (
        <div>
        <div className="bg-light p-3 mb-4">
          <h2 className="mb-0">Total Patients: <span className="text-primary">{getTotalPatients()}</span></h2>
        </div>
        <div className="bg-light p-3 mb-4">
          <h2 className="mb-0">Disease with Maximum Cases: <span className="text-primary">{getDiseaseWithMaxCases().disease}</span></h2>
        </div>
         <div className="my-4">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => handleDisplayOptionChange("hospital")}
            >
              Hospitals
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleDisplayOptionChange("disease")}
            >
              Diseases
            </button>
          </div>

          {displayOption === "hospital" ? (
            <div>
              <h2>Diseases by Hospital:</h2>
              {Object.entries(getDiseasesByHospital()).map(([hospitalName, diseases]) => (
                <div key={hospitalName} className="card mb-4">
                  <div className="card-header">{hospitalName}</div>
                  <div className="card-body">
                    <ul>
                      {Object.entries(diseases).map(([diseaseName, cases]) => (
                        <li key={diseaseName}>
                          {diseaseName}: {cases} cases
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>Diseases by Max Cases:</h2>
              {Object.entries(getDiseasesByMaxCases()).map(([diseaseName, cases]) => (
                <div key={diseaseName} className="card mb-4">
                  <div className="card-header">{diseaseName}</div>
                  <div className="card-body">
                    <ul>
                      {Object.entries(getDiseasesByHospital()).map(([hospitalName, diseases]) => (
                        <li key={hospitalName}>
                          {hospitalName}: {diseases[diseaseName] ? diseases[diseaseName] : 0} cases
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
