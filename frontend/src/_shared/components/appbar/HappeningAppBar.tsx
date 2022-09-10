import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import UserButton from "./UserButton";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "@mui/icons-material";
import CopyButton from "./CopyButton";

function HappeningAppBar() {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = ``;
    navigate(path);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Routes>
          <Route element={<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={routeChange}
          >
            <Home/>
          </IconButton>} path="/*"/>
          <Route path="/"/>
        </Routes>
        <Typography variant="h6" component="div" color="inherit" sx={{flexGrow: 1}} fontFamily="Monospace">
          hAPPening
        </Typography>
        <Routes>
          <Route element={<CopyButton/>}  path="/event/:id"/>
        </Routes>
        <ThemeSwitch/>
        <UserButton/>
      </Toolbar>
    </AppBar>
  );
}

export default HappeningAppBar;
