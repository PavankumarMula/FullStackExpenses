import React from "react";
import { expensesContext } from "../context/expenseContext";
import { useContext } from "react";
import "../styles/DisplayExpenses.css";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/userAuth";

const DisplayExpenses = () => {
  const expenseCtx = useContext(expensesContext);
  const expenses = expenseCtx.expenses;
  const authCtx = useContext(userAuthContext);
  const navigate = useNavigate();

  // expenses edit Handler
  const editHandler = (expense) => {
    navigate("/expenses", { state: { data: expense } });
  };

  // expenses delete handler
  const deleteHandler = (id) => {
    // make http request to delete the product
    expenseCtx.removeExpense(id);
  };

  return (
    <>
      {authCtx.isUserLoggedIn ? (
        <div className="expense-table">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.expenseName}</td>
                  <td>{expense.description}</td>
                  <td>Rs.{expense.price}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      onClick={() => {
                        editHandler(expense);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteHandler(expense.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </>
  );
};

export default DisplayExpenses;
