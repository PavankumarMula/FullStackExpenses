import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { userAuthContext } from "../context/userAuth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const authCtx = useContext(userAuthContext);
  const navigate = useNavigate();

  // handling log out functionality
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  // handling premium feature functionalities
  const premiumHandler = async () => {
    // make api call to the backend to know this user trying to use premium services
    let token = localStorage.getItem("token");
    try {
      const getOrderId = await axios.get(`http://localhost:4000/premium`, {
        headers: { Authorization: token },
      });

      const { status, data } = getOrderId;

      if (status === 200) {
        // redirect to razorpay window
        const { order, key_Id } = data;
        const options = {
          key: key_Id, // your Razorpay API key
          amount: order.amount,
          currency: "INR",
          name: "Sharpner Tech",
          description: "Upskill YourSelf",
          order_id: order.id,
          prefill: {
            email: "user@example.com", // Pre-fill the customer's email (optional)
            contact: "9999999999", // Pre-fill the customer's phone number (optional)
          },
        };

        // instantiating razor pay window
        const razorPayInstance = new window.Razorpay(options);
        razorPayInstance.open();

      } else {
        throw new Error("something is wrong with fetching getting order Api");
      }
    }
    
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="nav-container">
        <Link to="/login">Register</Link>
        <Link to="/expenses">Add Expense</Link>
        <Link to="/displayexpenses">Expenses</Link>
        <button onClick={logoutHandler}>Logout</button>
        <button id="premium-button" onClick={premiumHandler}>
          Buy Premium
        </button>
      </div>
    </>
  );
};

export default NavBar;
