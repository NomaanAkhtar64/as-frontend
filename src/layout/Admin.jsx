import React, { useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const titles = {
  '/': 'ADMIN PANEL',
  '/employees': 'VIEW EMPLOYEE DATA',
  '/manual-attendance': 'Manually Mark Employee Attendance',
  '/registrations': 'Approve Employee Registration Requests',
};

function AdminLayout({ children, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = 'Admin Panel';
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {titles[location.pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Admin' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/employees')}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary='Employees' />
          </ListItem>
          <ListItem button onClick={() => navigate('/registrations')}>
            <ListItemIcon>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary='Registrations' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/manual-attendance')}>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary='Manual Attendance' />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
