import React from 'react';
import './App.css';
import {
  createTheme, CssBaseline,
  ThemeProvider
} from "@mui/material";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HappeningAppBar from "./_shared/components/appbar/HappeningAppBar";
import {RootState} from "./_shared/helpers/store";
import {connect, ConnectedProps} from "react-redux";
import CreateEventButton from "./_shared/components/CreateEventButton";
import Event from "./_shared/components/Event";
import Home from "./HomePage/Home"

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
            <div>
              <Home/>
              <CreateEventButton/>
            </div>
          } path="/"/>
          <Route path="/event/:id" element={<Event/>}/>
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default connector(App);
