// Nav bar page, handles a few different screen sizes to allow for even mobile users
// to have proper access to all aprts fo the application

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {["Home", "Schedule", "Scouting Report"].map((text) => (
        <ListItem button key={text} onClick={() => setMobileOpen(false)}>
          <Link
            to={`/${
              text === "Home" ? "" : text.toLowerCase().replace(" ", "-")
            }`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary={text} />
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00538C" }}>
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <img
            src={`${process.env.PUBLIC_URL}/mavslogo.png`}
            alt="Logo"
            className="mr-2 h-10"
          />
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            Dallas Mavericks Internal Tooling
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
          <Link
            to="/schedule"
            style={{ textDecoration: "none", color: "white" }}
          >
            Schedule
          </Link>
        </div>
        <div className="md:hidden">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
