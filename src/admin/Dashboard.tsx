import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './side-bar/Sidebar';


function Dashboard() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return <Navigate to={'/login'}></Navigate>
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Clipped drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ marginTop: 60 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
export default Dashboard;