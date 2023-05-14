import axios from "axios";
import React, { useEffect, useState } from "react";

import HospitalSelect from "./HospitalSelect.jsx";
import { v4 as uuidv4 } from "uuid";

export default function DataEntry({ urlD }) {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [entries, setEntries] = useState([
    { disease: "", cases: 0, diseaseId: "", dateAdded: "", userThatAdded: "" },
  ]);
  const [showDataEntryForm, setShowDataEntryForm] = useState(true);
  const [showNewDiseaseForm, setShowNewDiseaseForm] = useState(false);
  const [newDiseaseName, setNewDiseaseName] = useState("");
  const [diseases, setDiseases] = useState([{}]);

  async function fetchDisease() {
    await axios.get(urlD + "/diseases").then((res) => {
      console.log("data of disease", res.data);
      setDiseases((prev) => res.data);
    });
  }
  useEffect(() => {
    fetchDisease();
  }, []);

  const handleHospitalChange = (selectedValue) => {
    setSelectedHospital((prev) => selectedValue);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleAddEntry = () => {
    const newEntry = { disease: "", cases: 0 };
    setEntries([...entries, newEntry]);
  };

  const handleDeleteEntry = () => {
    const newEntries = [...entries];
    newEntries.pop();
    setEntries((prev) => newEntries);
  };

  const handleDiseaseChange = (index, value) => {
    if (value === "newd") {
      setShowDataEntryForm((prev) => false);
      setShowNewDiseaseForm((prev) => true);
    } else {
      const newEntries = [...entries];
      newEntries[index].disease = value;
      newEntries[index].dateAdded = selectedDate;
      newEntries[index].diseaseId = "";
      newEntries[index].userThatAdded = "";
      setEntries((prev) => newEntries);
    }
  };

  const handleCasesChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].cases = parseInt(value);
    setEntries((prev) => newEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const diseaseData = {
      hospitalName: selectedHospital.hospitalName,
      hospitalId: selectedHospital.hospitalId,
      arrDiseasesCases: entries,
      date: selectedDate,
      user: "",
    };

    
    

    // submitting the form data to the server=======================================================================================================================================

    try {
      await axios.post(urlD + "/dailylog", diseaseData).then((res) => {
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setEntries((prevEnt) => [
        { disease: "", cases: 0, diseaseId: "", dateAdded: "" },
      ]);

      console.log("object sent ", diseaseData, "the entries", entries);
    }
  };

  return (
    <div>
      <HospitalSelect onChange={handleHospitalChange} urlH={urlD} />
      {selectedHospital && showDataEntryForm && (
        <div>
          <h4 className="text-center mt-3">
            Selected Hospital: {selectedHospital.hospitalName} with :
            {selectedHospital.hospitalId}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dateInput" className="form-label">
                Select Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            {entries.map((entry, indexEnt) => (
              <div className="row" key={indexEnt}>
                <label className="col-sm-6">
                  Disease #{indexEnt + 1}:
                  <select
                    value={entry.disease}
                    onChange={(e) =>
                      handleDiseaseChange(indexEnt, e.target.value)
                    }
                    required
                  >
                    <option value="">Select a disease</option>
                    {diseases.map((dis) => (
            <option id ={dis.diseaseId} value={dis.diseaseName} key={dis.diseaseId}>
              {dis.diseaseName}
            </option>
          ))}
                    <option key={"new"} value={"newd"}>
                      Add new
                    </option>
                  </select>
                </label>
                <label className="col-sm-6">
                  Cases:
                  <input
                    type="number"
                    value={entry.cases}
                    onChange={(e) =>
                      handleCasesChange(indexEnt, e.target.value)
                    }
                    required
                  />
                </label>
              </div>
            ))}
            <div
              style={{ marginTop: "30px" }}
              className="d-flex justify-content-between align-items-center"
            >
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddEntry}
              >
                Add Entry
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleDeleteEntry}
              >
                Delete Last Entry
              </button>
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {
        showNewDiseaseForm && (
        <div className="mt-2">
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new hospital name"
                value={newDiseaseName}
                onChange={function handleNewDiseaseNameChange(e){
                  setNewDiseaseName(e.target.value);
                }}
                required
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={async function handleAddDisease(e) {
                  e.preventDefault();
                  try {
                    const diseaseIdGen = uuidv4();
                    const response = await axios.post(urlD + "/diseases", {
                      diseaseName: newDiseaseName,
                      diseaseId: diseaseIdGen,
                    });
              
                    console.log(response.data);
                    setShowNewDiseaseForm(false);
                    setShowDataEntryForm(true);
                
                    setNewDiseaseName("");
            
                    fetchDisease();
                  } catch (e) {
                    console.log("error", e);
                  }
                }
            }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        )
      }
    </div>
  );
}
