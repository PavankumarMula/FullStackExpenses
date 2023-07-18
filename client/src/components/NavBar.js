import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { userAuthContext } from "../context/userAuth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const authCtx = useContext(userAuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <>
      <div className="nav-container">
        <Link to="/login">Register</Link>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/displayexpenses">Expenses</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default NavBar;
