import "./App.css";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import Expenses from "./components/Expenses";
import DisplayExpenses from "./components/DisplayExpenses";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<UserForm />}></Route>
          <Route path="/login" element={<UserForm />}></Route>
          <Route path="/expenses" element={<Expenses />}></Route>
          <Route path="/displayexpenses" element={<DisplayExpenses />}></Route>
          <Route path="leaderboard" element={<LeaderBoard />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
