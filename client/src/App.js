import "./App.css";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import Expenses from "./components/Expenses";
import { userAuthContext } from "./context/userAuth";
import { useContext } from "react";
import DisplayExpenses from "./components/DisplayExpenses";

function App() {
  const authCtx = useContext(userAuthContext);

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<UserForm />}></Route>

          <Route path="/expenses" element={<Expenses />}></Route>

          <Route path="/displayexpenses" element={<DisplayExpenses />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
