import React, { useState } from "react";
import "../styles/NavBar.css";
import {  NavLink,useLocation } from "react-router-dom";
import { userAuthContext } from "../context/userAuth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// toastify message
// toasting alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function for toastfy an alert
const notify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

const NavBar = () => {
  const authCtx = useContext(userAuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { isPremiumUser, userName } = authCtx;

  console.log(isPremiumUser, userName);

  // handling log out functionality
  const logoutHandler = () => {
    notify('user logged out')
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
        console.log(`order id before payment ${order.id}`);
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
          handler: async (response) => {
            // This function will be called after the payment is successful
            const { razorpay_order_id, razorpay_payment_id } = response;

            try {
              // Correct way of passing headers
              const res = await axios.post(
                `http://localhost:4000/updatepremium`,
                { razorpay_order_id, razorpay_payment_id },
                {
                  headers: { Authorization: token },
                }
              );

              const { status, data } = res;
              if (status === 200) {
                notify(data.message);
                authCtx.setPremuisUser(`http://localhost:4000/updatepremium`);
              }
            } catch (error) {
              console.log(error);
            }
          },
        };

        // instantiating razor pay window
        const razorPayInstance = new window.Razorpay(options);
        razorPayInstance.open();

        // setup event listener for payment failure case
        razorPayInstance.on("payment.failed", async function (response) {
          const { order_id, payment_id } = response.error.metadata;
          try {
            await axios.post(
              `http://localhost:4000/updatestatus`,
              {
                order_id,
                payment_id,
              },
              {
                headers: { Authorization: token },
              }
            );
          } catch (error) {
            notify('something went wrong');
          }
          alert("payment is Failed");
        });
      } else {
        throw new Error("something is wrong with fetching getting order Api");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="nav-container">
      <NavLink to="/login" className={location.pathname === '/login' ? 'active-link' : ''}>
        Register
      </NavLink>
      <NavLink to="/expenses" className={location.pathname === '/expenses' ? 'active-link' : ''}>
        Add Expense
      </NavLink>
      <NavLink to="/displayexpenses" className={location.pathname === '/displayexpenses' ? 'active-link' : ''}>
        Expenses
      </NavLink>
        {isPremiumUser ? (
          <h4 style={{ color: "black" }}>
            {userName.toUpperCase()}, a Premium User
          </h4>
        ) : (
          <button id="premium-button" onClick={premiumHandler}>
            Buy Premium
          </button>
        )}

        {isPremiumUser ? (
          <button onClick={() => navigate("/leaderboard")}>Leader Board</button>
        ) : (
          ""
        )}
         <button onClick={logoutHandler}>Logout</button>
      </div>
      <ToastContainer/>
    </>
  );
};

export default NavBar;
