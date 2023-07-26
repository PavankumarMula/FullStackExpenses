import React, { useState } from "react";
import '../styles/ForgotPassword.css'
import axios from 'axios';

const ForgotPassword = () => {
  const [input, setInput] = useState("");

  const passwordFormHandler = async(e) => {
    e.preventDefault();
    const response=await axios.post(`http://localhost:4000/forgotpassword`,{input});
    console.log(response);
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
    </>
  );
};

export default ForgotPassword;
