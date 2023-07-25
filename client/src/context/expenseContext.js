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
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const fetchExpenses = await axios.get(
          `http://localhost:4000/expenses`,
          { headers: { Authorization: token } }
        );
        const response = await fetchExpenses;
        const { data, status } = response;
        if (status === 200) {
          setExpenses(data);
        } else {
          throw new Error("something wrong with fetcging expenses");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function for deleting the expense

  const removeExpense = async (expense) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.delete("http://localhost:4000/expenses", {
          headers: {
            Authorization: token,
          },
          data: expense, // The data to be passed in the request body
        });

        // If you want to log the response data
        setExpenses(response.data);
      } catch (error) {
        console.error(error);
      }
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
