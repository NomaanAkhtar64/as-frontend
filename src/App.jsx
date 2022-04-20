import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useUser from "./hooks/user";
import * as Screens from "./screens";
import * as Routers from "./routers";
import * as Layout from "./layout/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
function App() {
  const userManager = useUser();
  if (!userManager.isLogin)
    return (
      <Routes>
        <Route path="/" exact element={<Screens.Login />} />
        <Route path="/signup" exact element={<Screens.SignUp />} />
        <Route path="/signup/success" element={<Screens.SignUpSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  if (userManager.state.user.is_staff)
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout.Admin onLogout={() => userManager.actions.logout()}>
          <Routers.Admin />
        </Layout.Admin>
      </LocalizationProvider>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Layout.Employee onLogout={() => userManager.actions.logout()}>
        <Routers.Employee />
      </Layout.Employee>
    </LocalizationProvider>
  );
}

export default App;
