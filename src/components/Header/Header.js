import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home"; // Importing home icon
import BookIcon from "@mui/icons-material/Book"; // Importing book icon
import LogoutIcon from "@mui/icons-material/Logout"; // Importing logout icon
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import logo from "../../images/Homelogo1.png";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        cookies.remove('jwt_token');
        navigate('/Login');
    };

    const handleHome = () => {
        navigate('/Home');
    };

    const handleBookshelves = () => {
        navigate('/Bookshelves');
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff", color: "#0284c7" }} className="navigationbar">
            <Toolbar>
                {/* Logo */}
                <a className="navbar-brandimg" href="$">
                    <img className="brandlogo" src={logo} alt="homelogo" />
                </a>

                {/* Desktop Menu Links */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    <Button className="nav-button" onClick={handleHome} startIcon={<HomeIcon />}>Home</Button>
                    <Button className="nav-button" onClick={handleBookshelves} startIcon={<BookIcon />}>Bookshelves</Button>
                    <Button className="nav-button" onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
                </Box>

                {/* Mobile Hamburger Icon */}
                <IconButton
                    edge="end"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto', color: "#0284c7" }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Drawer Menu for Mobile */}
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List style={{ width: 250 }}>
                        <ListItem button onClick={handleHome}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={handleBookshelves}>
                            <ListItemText primary="Bookshelves" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
