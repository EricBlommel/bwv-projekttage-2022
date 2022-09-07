import React from 'react';
import './App.css';
import {
  Box, CircularProgress,
  createTheme, CssBaseline, Grid, IconButton, Stack, Switch,
  ThemeProvider
} from "@mui/material";
import Test from "./_shared/components/Test";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HappeningAppBar from "./_shared/components/appbar/HappeningAppBar";
import {RootState} from "./_shared/helpers/store";
import {connect, ConnectedProps} from "react-redux";
import {AddCircle} from "@mui/icons-material";
import AddEventButton from "./_shared/components/AddEventButton";

const mapState = (state: RootState) => ({
  themeStoreDarkMode: state.themeStore.darkMode
});

const connector = connect(mapState);

const themeDark = createTheme({
  palette: {
    mode: "dark"
  }
})

const themeLight = createTheme({
  palette: {
    mode: "light"
  }
})

interface Props extends ConnectedProps<typeof connector> {

}

function App(props: Props) {

  return (
    <ThemeProvider theme={props.themeStoreDarkMode ? themeDark : themeLight}>
      <BrowserRouter>
        <HappeningAppBar/>
        <CssBaseline/>

        <Routes>
          <Route element={
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'center',
              height: '90vh'
            }}
                 justifyContent={"center"}>
              <Stack spacing={2}>
                <AddEventButton/>
              </Stack>

            </Box>
          } path="/"/>
          <Route path="/event/" element={<CircularProgress/>} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default connector(App);
