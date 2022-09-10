import React, {useMemo, useRef, useState} from 'react';
import EventService from "../_shared/services/event.service";
import {EventResource} from "../_shared/types/event.type";
import {Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, CssBaseline, Grid, Typography} from "@mui/material";
import {Celebration} from "@mui/icons-material";
import {Navigate, useNavigate} from "react-router-dom";
import CreateEventButton from "../_shared/components/CreateEventButton";
import AuthService from "../_shared/services/auth.service";
import {User} from "../_shared/types/user.type";

const cardStyle = {
  minHeight: 250,
  maxHeight: 250
};

interface Props {
}

function HomeNotLoggedIn(props: Props) {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signin`;
    navigate(path);
  }
  
  return (
    <Box
      textAlign='center'
      sx={{
        marginTop: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography>
        Du musst angemeldet sein um Ereignisse erstellen zu können.
      </Typography>
      <Button variant="contained" sx={{mt: 2}} onClick={routeChange}>
        Anmelden
      </Button>
    </Box>
  )
}

export default HomeNotLoggedIn;