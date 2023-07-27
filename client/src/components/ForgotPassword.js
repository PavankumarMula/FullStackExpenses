import React, { useState } from "react";
import '../styles/ForgotPassword.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";



// toasting alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// function for toastfy an alert
const notify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const ForgotPassword = () => {
  const [input, setInput] = useState("");
  const navigate=useNavigate();

  const passwordFormHandler = async(e) => {
    e.preventDefault();
    const response=await axios.post(`http://localhost:4000/forgotpassword`,{email:input});
    const {data,status}=response;
    if(status===200){
        notify(data);
        navigate('/login');
    }
  };

  return (
    <>
      <div className="password">
        <form onSubmit={passwordFormHandler}>
          <label>Please Enter your Email</label>
          <input type="email" onChange={(e) => setInput(e.target.value)}></input>
          <button type="submit">submit</button>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ForgotPassword;
