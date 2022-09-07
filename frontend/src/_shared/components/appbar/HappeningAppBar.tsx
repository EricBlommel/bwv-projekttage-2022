import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import UserButton from "./UserButton";

function HappeningAppBar() {

  return (
    <AppBar position="static">
      <Toolbar>
        {/*<IconButton*/}
        {/*  size="large"*/}
        {/*  edge="start"*/}
        {/*  color="inherit"*/}
        {/*  aria-label="menu"*/}
        {/*  sx={{ mr: 2 }}*/}
        {/*>*/}
        {/*  <Home/>*/}
        {/*</IconButton>*/}
        <Typography variant="h6" component="div" color="inherit" sx={{ flexGrow: 1 }} fontFamily="Monospace" >
          hAPPening
        </Typography>
        <ThemeSwitch />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}

export default HappeningAppBar;
