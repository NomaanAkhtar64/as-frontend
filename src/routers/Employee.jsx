import React from "react";
import { Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "../hooks/Employee/employee";
import { Home, Attendance, RequestLeave } from "../screens/Employee";
function EmployeeRouter() {
  return (
    <EmployeeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/request-leave" element={<RequestLeave />} />
      </Routes>
    </EmployeeProvider>
  );
}

export default EmployeeRouter;
