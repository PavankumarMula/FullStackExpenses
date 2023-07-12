import React, { useEffect, useState } from "react";
import "../styles/UserForm.css";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [haveAnAccount, setHaveAnAccount] = useState(false);

  // Handling the user Input through Form
  const formHandler = async (e) => {
    e.preventDefault();

    // if user has an account
    if (haveAnAccount === true) {
      const existinguser = { email: email, password: password };
      try {
        const getUser = await axios.post(
          `http://localhost:4000/existinguser`,
          existinguser
        );
        const response = getUser.data;
        alert(response);
      } catch (error) {
        alert(error.response.data);
      }
    }

    // if the user is new has no Account.
    else {
      const data = { name, email, password };

      //posting new userData into database
      try {
        const response = await axios.post(
          `http://localhost:4000/newuser`,
          data
        );
        const resData = response.data;
        alert(resData);
      } catch (error) {
        alert(error.response.data);
      }
    }

    //reset the form inputs
    setEmail("");
    setName("");
    setPassword("");
  };

  // toggle button handler
  const toggleButtonHandler = () => {
    setHaveAnAccount((prev) => !prev);
  };

  return (
    <>
      <div className="auth">
        <form className="form-container" onSubmit={formHandler}>
          {haveAnAccount === false && (
            <>
              <label>User Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                value={name}
                required
              ></input>
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            value={email}
            required
          ></input>

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            value={password}
          ></input>

          <button type="submit">{haveAnAccount ? "Signin" : "Signup"}</button>
        </form>

        <button className="toggle-button" onClick={toggleButtonHandler}>
          {haveAnAccount ? "new User? Signup" : "Already have an acoount?"}
        </button>
      </div>
    </>
  );
};

export default UserForm;
