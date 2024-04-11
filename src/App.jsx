import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/loginpage/Login";
import MainPage from "./components/mainpage/mainPageC/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
