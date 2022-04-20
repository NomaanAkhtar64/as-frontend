import React, { useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import CelebrationIcon from '@mui/icons-material/Celebration';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const titles = {
  '/': 'ADMIN PANEL',
  '/employees': 'VIEW EMPLOYEE DATA',
  '/manual-attendance': 'Manually Mark Employee Attendance',
  '/registrations': 'Approve Employee Registration Requests',
  '/holidays': 'Manage Holidays',
  // "/calendar": "View Calendar",
  "/requested-leaves": "Check all the Requested Leaves",
};

const menuBarLists = [
  [{ text: "Overview", Icon: AdminPanelSettingsIcon, route: "/" }],
  [{ text: "Employees", Icon: PeopleAltIcon, route: "/employees" },
  { text: "Registrations", Icon: AppRegistrationIcon, route: "/registrations" },
  { text: "Leave Requests", Icon: AccessTimeFilledIcon, route: "/requested-leaves" }],
  [{ text: "Holidays", Icon: CelebrationIcon, route: "/holidays" },
    // {text: "Calendar", Icon:CalendarMonthIcon, route:"/calendar"}
  ],
  [{ text: "Manual Attendance", Icon: BadgeIcon, route: "/manual-attendance" }]
]

function AdminLayout({ children, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Admin Panel";
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {titles[location.pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {menuBarLists.map((list, idx) => (
          <React.Fragment key={idx}>
            <Divider />
            <List>
              {list.map((item, idx2) => (
                <ListItem key={idx2} button onClick={() => navigate(item.route)}>
                  <ListItemIcon>
                    <item.Icon style={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              onLogout();
              navigate("/");
            }}
          >
            <ListItemIcon>
              <LogoutIcon style={{ color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box >
  );
}

export default AdminLayout;
