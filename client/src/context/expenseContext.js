import React, { useEffect, useState } from "react";
import axios from "axios";

// creating expenses Context
export const expensesContext = React.createContext();

// creating expenses Context provider so that data will be shared among components
const ExpenseCtxProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  

  // fetch when new expense is added to to array.
  useEffect(() => {
    fetchExpensesFromDb();
  }, []);

  // function to fetch expenses ;
  const fetchExpensesFromDb = async () => {
    const token=localStorage.getItem('token');
    try {
      const fetchExpenses = await axios.get(`http://localhost:4000/expenses`,{headers:{Authorization:token}});
      const response = await fetchExpenses;
      const { data, status } = response;
      if (status === 200) {
        setExpenses(data);
      } else {
        throw new Error("something wrong with fetcging expenses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function for deleting the expense
  const removeExpense = async (id) => {
    try {
      const deleteExpense = await axios.delete(
        `http://localhost:4000/expenses/${id}`
      );
      const { status } = await deleteExpense;
      if (status === 200) {
        // after deleting expense from db fetch again;
        fetchExpensesFromDb();
      } else {
        throw new Error("some thing went wrong while deleting");
      }
    } catch (error) {
      alert(error);
    }
  };

  // after adding expense into db fetch again
  const addExpense = () => {
    fetchExpensesFromDb();
  };

  // after editing expense into db fetch again
  const editExpense = (expense) => {
    fetchExpensesFromDb();
  };

  const contextValue = {
    expenses,
    removeExpense,
    editExpense,
    addExpense,
  };

  return (
    <>
      <expensesContext.Provider value={contextValue}>
        {children}
      </expensesContext.Provider>
    </>
  );
};

export default ExpenseCtxProvider;
