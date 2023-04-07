import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function Hospitalbar({ onChange, urlH }) {
  const [selectedHospital, setSelectedHospital] = useState({hospitalName:"",hospitalId:""});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState("");

  const [arrHos, setArrHos] = useState([{ name: "r1", hospitalId: "12qwer" }]);

  async function getHosList() {
    await axios.get(urlH + "/hospitals").then((res) => {
      setArrHos((pHos) => res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    getHosList();
  }, []);

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    const selectedId= e.target.options[e.target.selectedIndex].id; ;
    // console.log("reality",selectedValue,"id",selectedId,e.target);
    setSelectedHospital(prev=>({hospitalName:selectedValue,hospitalId:selectedId}));
    if (selectedValue === "add") {
      setShowAddForm(true);

    } else {
      setShowAddForm(false);
      onChange({hospitalName:selectedValue,hospitalId:selectedId});
    }
  };

  const handleAddHospital = async (e) => {
    console.log("q");
    e.preventDefault();
    try{
      const hospitalIdGen =uuidv4();
   await  axios.post(urlH+"/hospitals", {
        hospitalName: newHospitalName,
        hospitalId: hospitalIdGen,
      })
      .then((response) => {
        const newHospital = response.data;
        console.log(response.data)
        setShowAddForm(false);
        setSelectedHospital(prev=>(newHospital));
        setNewHospitalName("");
        onChange(newHospital);
        getHosList();
    
      });
    }
    catch(e){console.log("error",e)}
  };

  const handleNewHospitalNameChange = (e) => {
    setNewHospitalName(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div>
        <select
          className="form-select"
          value={selectedHospital.hospitalName}
        
          onChange={handleSelect}
        >
          <option  key ="de" value="">Select Hospital</option>
          {arrHos.map((hos) => (
            <option id ={hos.hospitalId} value={hos.hospitalName} key={hos.hospitalId}>
              {hos.hospitalName}
            </option>
          ))}
          <option key="addn" id="addhos" value="add">Add Hospital</option>
        </select>
      </div>
      {showAddForm && (
        <div className="mt-2">
          <form
          
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new hospital name"
                value={newHospitalName}
                onChange={handleNewHospitalNameChange}
                required
              />
              <button className="btn btn-primary" type="submit" onClick={handleAddHospital}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
