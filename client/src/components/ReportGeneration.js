import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/Report.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { userAuthContext } from "../context/userAuth";
import { expensesContext } from "../context/expenseContext";
import axios from "axios";

const ReportGeneration = () => {
  const authCtx = useContext(userAuthContext);
  const expenseCtx = useContext(expensesContext);

  const [currentPage,setCurrentPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [expensesPerPage,setExpenses] = useState([]);

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      console.log(currentPage);
      getExpensesByPage(currentPage)
    }
  },[currentPage])

  // function for getting expenses page by page
  const getExpensesByPage =async(pageNumber)=>{
    const token=localStorage.getItem('token');
    try {
     const res= await axios(`http://localhost:4000/pagination?page=${pageNumber}`,{
      headers: { Authorization: token },
     });
     const {status,data:{expenses,totalPages}}=res;
     if(status===200){
      setTotalPages(totalPages);
      setExpenses(expenses);
     }
    } 
    
    catch (error) {
      console.log(error)
    }
  }
  
  // page Handlers
  const prevHandler=()=>{
    if(currentPage>1){
      setCurrentPage(prevState=>prevState-1);
    }
  }

  const nextHandler=()=>{
    if(currentPage<totalPages){
      setCurrentPage(prevState=>prevState+1);
    }
  }



  // formating the date
  const date = new Date();
  const today = `${date.getDate()}-0${date.getMonth()}-${date.getFullYear()}`;
  const month =  date.toLocaleString('default', { month: 'long' });

  const pdfref = useRef();

  // function to download the all the premium expenses
  const downloadHandler = () => {
    const reportContainer = pdfref.current;
    html2canvas(reportContainer, { scrollY: -window.scrollY }).then(
      (canvas) => {
        const contentDataURL = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(contentDataURL, "PNG", 0, 0, 210, 297);
        pdf.save("financial_report.pdf");
      }
    );
  };

  // function to show Total
  let totalAmount = 0;
  const total = () => {
    for (let i = 0; i < expenseCtx.expenses.length; i++) {
      totalAmount += Number(expenseCtx.expenses[i].price);
    }
    return totalAmount;
  };
  total();

  return (
    <>
      <div className="report-container" ref={pdfref}>
        <h2>Day to Day expenses</h2>
        <table id="report-table">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Expenses</th>
          </tr>
          {expensesPerPage.length > 0 &&
            authCtx.isPremiumUser &&
            expensesPerPage.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{today}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
        </table>
        <div>
        <button onClick={prevHandler}>Prev</button>
        <span>Current Page of {totalPages}</span>
        <button onClick={nextHandler}>Next</button>
        </div>
        <h4>Total:Rs.{totalAmount}</h4>
        <h2>Monthly expenses</h2>
        <table id="report-table">
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Savings</th>
          </tr>
          <tr>
            <td>
              {month}
            </td>
            <td>Rs.5,00,000</td>
            <td>{totalAmount}</td>
            <td>Rs.{500000-totalAmount}</td>
          </tr>
        </table>
        <button id="download-button" onClick={downloadHandler}>
          Download Report
        </button>
      </div>
    </>
  );
};

export default ReportGeneration;
