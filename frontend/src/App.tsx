import React, {useState} from 'react';
import './App.css';
import {
  createTheme, CssBaseline,
  ThemeProvider
} from "@mui/material";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HappeningAppBar from "./_shared/components/appbar/HappeningAppBar";
import {RootState} from "./_shared/helpers/store";
import {connect, ConnectedProps} from "react-redux";
import Event from "./_shared/components/Event";
import Home from "./HomePage/Home"
import SignIn from "./HomePage/SignIn";
import {User} from "./_shared/types/user.type";
import AuthService from "./_shared/services/auth.service";
import HomeNotLoggedIn from "./HomePage/HomeNotLoggedIn";

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

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

interface Props extends ConnectedProps<typeof connector> {

}

function App(props: Props) {

  const user: User = AuthService.getCurrentUser();
  const forceUpdate = useForceUpdate();

  return (
    <ThemeProvider theme={props.themeStoreDarkMode ? themeDark : themeLight}>
      <BrowserRouter>
        <HappeningAppBar/>
        <CssBaseline/>

        <Routes>
          <Route path="/" element={user? <Home/> : <HomeNotLoggedIn/>}/>
          <Route path="/signin" element={<SignIn forceUpdate={forceUpdate}/>}/>
          <Route path="/signup" element={<SignIn signUp forceUpdate={forceUpdate}/>}/>
          <Route path="/event/:id" element={<Event/>}/>
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default connector(App);
