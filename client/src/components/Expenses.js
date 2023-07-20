import React, { useEffect, useState } from "react";
import "../styles/Expenses.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { expensesContext } from "../context/expenseContext";
import { useContext } from "react";
import { userAuthContext } from "../context/userAuth";

const Expenses = () => {
  const [expense, setExpense] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [select, setSelect] = useState("");
  const [editMode, setEditMode] = useState(false);

  // accesssing expense Context
  const expenseCtx = useContext(expensesContext);

  //accessing user context
  const userCtx= useContext(userAuthContext);

  // accessing data received by useNaviagate
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    if (data) {
      setExpense(data.expenseName);
      setDesc(data.description);
      setPrice(data.price);
      setSelect(data.category);
      setEditMode(true);
    }
  }, [data]);

  const navigate = useNavigate();

  // handling form once user is submitted
  const formHandler = async (e) => {
    e.preventDefault();

    //accessing token sending it to the headers
    const token=localStorage.getItem('token');
  
    // sending user inputs in the form of object
    const formData = { expense, desc, price, select };
    //editing the expense
    if (editMode) {
      const editedFormData = {
        id: data.id,
        expense,
        price,
        desc,
        select,
      };
      try {
        const sendEditedInfo = await axios.put(
          `http://localhost:4000/expenses`,
          editedFormData,{headers:{Authorization:token}}
        );
        const response = await sendEditedInfo;
        const { data, status } = response;
        if (status === 200) {
          alert(data);

          expenseCtx.editExpense();
          // resetting the inputs
          setExpense("");
          setDesc("");
          setPrice("");
          setSelect("");
          // navigate to display Expenses page
          navigate("/displayexpenses");
        } else {
          throw new Error("something wrong with adding expenses");
        }
      } catch (error) {
        console.log(error);
      }
      setEditMode(false);
    }

    // adding new Expense
    else {
      try {
        const sendFormData = await axios.post(
          `http://localhost:4000/expenses`,
          formData,{headers:{Authorization:token}}
        );
        const response = await sendFormData;
        const { data, status } = response;
        if (status === 200) {
          expenseCtx.addExpense();
          alert(data);
          // resetting the inputs
          setExpense("");
          setDesc("");
          setPrice("");
          setSelect("");
          // navigate to display Expenses page
          navigate("/displayexpenses");
        } else {
          throw new Error("something wrong with adding expenses");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
   <>
   {userCtx.isUserLoggedIn ? <div className="expense-form-container">
      <form onSubmit={formHandler} className="expense-form">
        <label htmlFor="Expense">Expense</label>
        <input
          type="text"
          onChange={(e) => setExpense(e.target.value)}
          value={expense}
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          value={desc}
        ></textarea>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>

        <label htmlFor="category">Category</label>
        <select onChange={(e) => setSelect(e.target.value)} value={select}>
          <option>Select Here</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>Food</option>
          <option>Others</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>:<h2>Please Log In</h2>}
   
   </>
  );
};

export default Expenses;
