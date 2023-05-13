import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Today() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const { ServerUrl } = useOutletContext();

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

  useEffect(() => {
    if (selectedDate !== "") {
      handleSubmit(new Event("submit"));
    }
  }, [selectedDate]);

  return (
    <div className="container">
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>


    {data.length > 0 && (
        <div>
          <h2 className="mt-4">Total Patients Today: {getTotalPatients()}</h2>
          <h2>Disease with Maximum Cases: {getDiseaseWithMaxCases().disease}</h2>

          <div className="mt-4">
            <h2>Diseases by Hospital:</h2>
            {Object.entries(getDiseasesByHospital()).map(([hospitalName, diseases]) => (
              <div key={hospitalName} className="card mb-3">
                <div className="card-header">
                  <h3>{hospitalName}</h3>
                </div>
                <ul className="list-group list-group-flush">
                  {Object.entries(diseases).map(([diseaseName, cases]) => (
                    <li key={diseaseName} className="list-group-item">
                      {diseaseName}: {cases} cases
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2>Diseases by Max Cases:</h2>
            {Object.entries(getDiseasesByMaxCases()).map(([diseaseName, cases]) => (
              <div key={diseaseName} className="card mb-3">
                <div className="card-header">
                  <h3>{diseaseName}</h3>
                </div>
                <ul className="list-group list-group-flush">
                  {Object.entries(getDiseasesByHospital()).map(([hospitalName, diseases]) => (
                    <li key={hospitalName} className="list-group-item">
                      {hospitalName}: {diseases[diseaseName] ? diseases[diseaseName] : 0} cases
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
