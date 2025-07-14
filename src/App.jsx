import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import SignUp from "./Component/Accounts/SignUp";
import SignIn from "./Component/Accounts/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
