import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../screens/Employee';
function EmployeeRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default EmployeeRouter;
