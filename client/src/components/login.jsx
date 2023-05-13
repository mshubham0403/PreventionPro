import React, { useState } from "react";
import "../assets/styles.css";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function Login() {
  
    const { ServerUrl } = useOutletContext();
  const { isLoggedIn } = useOutletContext();
  const { setIsLoggedIn } = useOutletContext();
    const [isLoginMode, setIsLoginMode] = useState(true);
  const [un, setUn] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  
  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    

    if (name === "userName") {
      setUn(prev => value);
    } else if (name === "password") {
      setPassword(prev => value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(prev =>value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      // login l
      const logData = {
        name: un,
        password: Password,
        
      };
      try {
     
        await axios.post(ServerUrl + "/users/login", logData).then((res) => {
          let resData = res.data;
          console.log(resData);
          setUn((prevun) => "success");
          setIsLoggedIn((prevLog) => true);
          //  Cookies.setItem("userId",resData.userIdSentServer)
          //  Cookies.setItem("userName",resData.userNameSentServer)
          //  setUserId(prevId => Cookies.getItem("userId"))
  
         
        });
        console.log("request to login sent");
      } catch (error) {
        console.log(error);
        setUN((prevun) => "error");
      }
      setPass((prevpass) => "");
  
    } else {
      //  register 
       if (confirmPassword === "") {
     
      alert("enter confirm password");
      return;
    }
      const userId = uuidv4();
      const logData = {
        name: un,
        password: Password,
        userId: userId,
      };
      try {
        await axios.post(ServerUrl + "/users", logData).then((res) => {
          let resData = res.data;
          console.log(resData);

          setUn((prevun) => "success");
        });
        console.log("emitted logdata");
      } catch (error) {
        console.log(error);
        setUn((prevun) => "error");
      }

      setPassword((prevpass) => "");
      setConfirmPassword(prev =>"");
    }
   
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
          alt="login"
        />
      </div>
      <div className="text-center mt-4 name">PreventionPro</div>
      <form className="p-3 mt-3" onSubmit={handleFormSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            value={un}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={Password}
            onChange={handleInputChange}
          />
        </div>
        {!isLoginMode && (
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPwd"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button className="btn mt-3">
          {isLoginMode ? "Login" : "Register"}
        </button>
      </form>
      <div className="text-center fs-6">
        {isLoginMode ? (
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={handleToggleMode}>
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="#" onClick={handleToggleMode}>
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
