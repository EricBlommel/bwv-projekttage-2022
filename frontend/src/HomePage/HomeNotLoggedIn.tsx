import React from 'react';
import {Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, CssBaseline, Grid, Typography} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";

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
        Du musst angemeldet sein um Ereignisse anlegen zu können.
      </Typography>
      <Button variant="contained" sx={{mt: 2}} onClick={routeChange}>
        Anmelden
      </Button>
    </Box>
  )
}

export default HomeNotLoggedIn;