import React, { useState } from "react";
import "../styles/Expenses.css";

const Expenses = () => {
  const [expense, setExpense] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [select, setSelect] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    console.log(expense, desc, price, select);
  };

  return (
    <div className="expense-form-container">
      <form onSubmit={formHandler} className="expense-form">
        <label htmlFor="Expense">Expense</label>
        <input type="text" onChange={(e) => setExpense(e.target.value)}></input>

        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
        ></textarea>

        <label htmlFor="price">Price</label>
        <input type="number" onChange={(e) => setPrice(e.target.value)}></input>

        <label htmlFor="category">Category</label>
        <select onChange={(e) => setSelect(e.target.value)}>
          <option>Select Here</option>
          <option>Entertainment</option>
          <option>Sports</option>
          <option>Food</option>
          <option>Others</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Expenses;
