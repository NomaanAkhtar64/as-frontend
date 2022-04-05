import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EmployeeArrayProvider } from '../hooks/employeeArray';
import {
  Home,
  // , Configuration
} from '../screens/Admin';
function AdminRouter() {
  return (
    <EmployeeArrayProvider>
      <Routes>
        {/* <Route exact path='/config' element={<Configuration />} /> */}
        <Route exact path='/' element={<Home />} />
      </Routes>
    </EmployeeArrayProvider>
  );
}

export default AdminRouter;
