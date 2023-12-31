import "./App.css";
import { Route, Routes } from "react-router-dom";
import { userAuthContext } from "./context/userAuth";
import { useContext } from "react";


import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import Expenses from "./components/Expenses";
import DisplayExpenses from "./components/DisplayExpenses";
import LeaderBoard from "./components/LeaderBoard";
import ForgotPassword from "./components/ForgotPassword";

import ResetPassword from "./components/ResetPassword";
import ReportGeneration from "./components/ReportGeneration";



function App() {
  const context = useContext(userAuthContext);
 
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/"  element={<UserForm />}></Route>
          <Route exact path="/login" element={<UserForm />}></Route>
          <Route exact path="/expenses" element={<Expenses />}></Route>
          <Route exact path="/displayexpenses" element={<DisplayExpenses />}></Route>
         {context.isPremiumUser && <Route exact path="leaderboard" element={<LeaderBoard />}></Route>}
        { !context.isUserLoggedIn&& <Route exact path="forgotPassword" element={<ForgotPassword/>}></Route>}
         <Route exact path="/resetPassword/:id" element={<ResetPassword/>}></Route>
         {context.isPremiumUser&& <Route exact path="/report" element={<ReportGeneration/>}></Route>}
        
        </Routes>
      </div>
    </>
  );
}

export default App;
