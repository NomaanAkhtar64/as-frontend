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
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DoneIcon from '@mui/icons-material/Done';

const drawerWidth = 240;

const titles = {
  "/": "Employee Hub",
  "/attendance": "Attendance",
  "/request-leave": "Request a Leave",
  "/granted-leaves": "Granted Leaves"
};
const menuBarLists = [
  [{ text: "Employee", Icon: PersonIcon, route: "/" },
  { text: "Attendance", Icon: BadgeIcon, route: "/attendance" }],
  [{ text: "Request a Leave", Icon: AccessTimeFilledIcon, route: "/request-leave" },
  { text: "Granted Leaves", Icon: DoneIcon, route: "/granted-leaves" }],
]

function EmployeeLayout({ children, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Employee Hub";
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "#333",
        }}
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
                    <item.Icon style={{ color: "#333" }} />
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
              <LogoutIcon />
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
    </Box>
  );
}

export default EmployeeLayout;
