import React, { useRef } from "react";
import "../styles/Report.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const financialRecords = [
  {
    date: "2023-07-01",
    description: "Salary",
    category: "Income",
    income: 2500,
    expenses: 0,
  },
  {
    date: "2023-07-02",
    description: "Rent",
    category: "Housing",
    income: 0,
    expenses: 800,
  },
  {
    date: "2023-07-05",
    description: "Groceries",
    category: "Food",
    income: 0,
    expenses: 150,
  },
  {
    date: "2023-07-08",
    description: "Freelance Work",
    category: "Income",
    income: 600,
    expenses: 0,
  },
  {
    date: "2023-07-12",
    description: "Electricity Bill",
    category: "Utilities",
    income: 0,
    expenses: 100,
  },
  {
    date: "2023-07-15",
    description: "Dinner Out",
    category: "Entertainment",
    income: 0,
    expenses: 50,
  },
  {
    date: "2023-07-20",
    description: "Gift for Friend",
    category: "Gifts",
    income: 0,
    expenses: 30,
  },
  {
    date: "2023-07-22",
    description: "Investment Return",
    category: "Income",
    income: 120,
    expenses: 0,
  },
  {
    date: "2023-07-25",
    description: "Phone Bill",
    category: "Utilities",
    income: 0,
    expenses: 80,
  },
  {
    date: "2023-07-28",
    description: "Gym Membership",
    category: "Health",
    income: 0,
    expenses: 60,
  },
];

const ReportGeneration = () => {
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

  return (
    <>
      <div className="report-container" ref={pdfref}>
        <h2>Day to Day expenses</h2>
        <table id="report-table">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>income</th>
            <th>Expenses</th>
          </tr>
          {financialRecords.slice(0, 5).map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.expenses}</td>
                <td>{item.income}</td>
              </tr>
            );
          })}
        </table>
        <h2>Monthly expenses</h2>
        <table id="report-table">
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Savings</th>
            <th>Expenses</th>
          </tr>
          {financialRecords.map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.expenses}</td>
              </tr>
            );
          })}
        </table>
        <button id="download-button" onClick={downloadHandler}>
          Download Report
        </button>
      </div>
    </>
  );
};

export default ReportGeneration;
