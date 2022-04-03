import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
