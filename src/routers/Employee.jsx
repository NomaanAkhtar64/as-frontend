import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EmployeeProvider } from '../hooks/Employee/employee';
import { Home, Attendance } from '../screens/Employee';
function EmployeeRouter() {
  return (
    <EmployeeProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/attendance' element={<Attendance />} />
      </Routes>
    </EmployeeProvider>
  );
}

export default EmployeeRouter;
