import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EmployeeArrayProvider } from '../hooks/Admin/employeeArray';
import {
  Home,
  Employees,
  Attendance,
  ManualAttendance,
} from '../screens/Admin';
function AdminRouter() {
  return (
    <EmployeeArrayProvider>
      <Routes>
        <Route exact path='/employees' element={<Employees />} />
        <Route path='/employees/attendance/:id' element={<Attendance />} />
        <Route exact path='/manual-attendance' element={<ManualAttendance />} />
        <Route exact path='/' element={<Home />} />
      </Routes>
    </EmployeeArrayProvider>
  );
}

export default AdminRouter;
