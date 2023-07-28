import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// toast
// toastify message
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

const ResetPassword = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // reset form handler
  const resetHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:4000/forgotPassword/${id}`,
      { password: input }
    );
    notify(response.data);
    navigate("/login");
  };
  return (
    <div
      className="reset-pwd"
      style={{
        height: "20vh",
        width: "30%",
        margin: "auto",
        marginTop: "40px",
        boxShadow: " 2px 4px 18px black ",
        borderRadius: "10px",
      }}
    >
      <form
        onSubmit={resetHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: "20px",
          padding: "20px",
        }}
      >
        <label>New Password</label>
        <input
          type="password"
          placeholder="enter new password"
          onChange={(e) => setInput(e.target.value)}
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            height: "25px",
            width: "80%",
          }}
        ></input>
        <button type="submit">submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
