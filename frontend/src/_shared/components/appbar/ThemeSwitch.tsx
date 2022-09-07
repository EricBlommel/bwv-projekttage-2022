import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import {DarkMode, LightMode} from "@mui/icons-material";
import {RootState} from "../../helpers/store";
import {connect, ConnectedProps} from "react-redux";
import {themeSet} from "../../actions/theme.actions";

const mapStateToProps = (state: RootState) => ({
  themeStoreDarkMode: state.themeStore.darkMode
});

const mapDispatchToProps = {
  themeStoreThemeSet: themeSet
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {

}

function ThemeSwitch(props:Props) {

  const handleClick = () => {
    const {themeStoreDarkMode, themeStoreThemeSet} = props;
    themeStoreThemeSet(!themeStoreDarkMode);
  }

  return (
    <IconButton onClick={handleClick} color="inherit" size="large">
      {props.themeStoreDarkMode && (<LightMode/>)}
      {!props.themeStoreDarkMode && (<DarkMode/>)}
    </IconButton>
  );
}

export default connector(ThemeSwitch);