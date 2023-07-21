import axios from "axios";
import React, { useEffect, useState } from "react";
import { expensesContext } from "../context/expenseContext";
import { useContext } from "react";

const LeaderBoard = () => {
    const expenseCtx=useContext(expensesContext);
  const [users, setUsers] = useState([]);
  const [expenses,setExpenses]=useState(expenseCtx.expenses)
  

  //fetch all the expenses
  useEffect(() => {
    fetchUsers();
  }, [expenses]);

  const fetchUsers = async () => {
    try {
      const userData = await axios.get(`http://localhost:4000/leaderboard`);
      const { data, status } = userData;
      if (status === 200) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          color: "red",
        }}
      >
        <table style={{ backgroundColor: "whitesmoke", marginTop: "80px" }}>
          <tbody>
            <tr style={{ fontFamily: "sans-serif", fontSize: "20px" }}>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
            {users.map((user) => {
              return (
                <tr
                  key={user.id}
                  style={{ fontFamily: 'monospace', fontSize: "18px" }}
                >
                  <td>{user.name}</td>
                  <td>Rs.{user.totalAmount}</td>
                  <td>{user.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderBoard;
