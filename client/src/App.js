import "./App.css";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import Expenses from "./components/Expenses";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<UserForm />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
      </Routes>
    </div>
  );
}

export default App;
