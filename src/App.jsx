import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import SignUp from "./Component/Accounts/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
