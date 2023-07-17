import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/userAuth";
import ExpenseCtxProvider from "./context/expenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpenseCtxProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ExpenseCtxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
