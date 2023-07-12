import React, { useState } from "react";
import "../styles/UserForm.css";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handling the user Input through Form
  const formHandler = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    try {
      const response = await axios.post(`http://localhost:4000/user`, data);
      const resData = response.data;
      alert(resData.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={formHandler}>
        <label>User Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        ></input>

        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserForm;
