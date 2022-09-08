import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import UserButton from "./UserButton";
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "@mui/icons-material";
import CopyButton from "./CopyButton";

function HappeningAppBar() {

  return (
    <AppBar position="static">
      <Toolbar>
        <Routes>
          <Route element={<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white'}}><Home/></Link>
          </IconButton>} path="/event/:id" />
        </Routes>
        <Typography variant="h6" component="div" color="inherit" sx={{ flexGrow: 1 }} fontFamily="Monospace" >
          hAPPening
        </Typography>
        <CopyButton/>
        <ThemeSwitch />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}

export default HappeningAppBar;
