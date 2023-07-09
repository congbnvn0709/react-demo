import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MENU } from "../../utils/helper/constants";
import { NavLink } from "react-router-dom";
const drawerWidth = 240;

function SideBar() {
    const menus = MENU;
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List disablePadding>
                    {menus.map((item, index) => (
                        <NavLink to={item.router} key={index}
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <ListItem disablePadding >
                                <ListItemButton >
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
export default SideBar;