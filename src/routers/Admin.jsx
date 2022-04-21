import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Home,
  Employees,
  Attendance,
  ManualAttendance,
  Registrations,
  RegistrationForm,
  Holidays,
  HolidayForm,
  RequestedLeaves,
  GrantedLeaves
} from '../screens/Admin';
function AdminRouter() {
  return (
    <Routes>
      <Route exact path='/employees' element={<Employees />} />
      <Route path='/employees/attendance/:id' element={<Attendance />} />
      <Route exact path='/manual-attendance' element={<ManualAttendance />} />
      <Route exact path='/registrations' element={<Registrations />} />
      <Route exact path='/registrations/:id' element={<RegistrationForm />} />
      <Route exact path='/holidays' element={<Holidays />} />
      <Route exact path='/holidays/create' element={<HolidayForm />} />
      <Route exact path='/requested-leaves' element={<RequestedLeaves />} />
      <Route path="/granted-leaves" element={<GrantedLeaves />} />
      <Route exact path='/' element={<Home />} />
    </Routes>
  );
}

export default AdminRouter;
