import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import {AccountCircle, DarkMode, LightMode, Person} from "@mui/icons-material";
import {RootState} from "../../helpers/store";
import {connect, ConnectedProps} from "react-redux";
import {themeSet} from "../../actions/theme.actions";
import {Tooltip} from "@mui/material";

const mapStateToProps = (state: RootState) => ({
    themeStoreDarkMode: state.themeStore.darkMode
});

const mapDispatchToProps = {
    themeStoreThemeSet: themeSet
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {

}

function UserButton(props: Props) {

    const handleClick = () => {
        const {themeStoreDarkMode, themeStoreThemeSet} = props;
        themeStoreThemeSet(!themeStoreDarkMode);
    }

    return (
        <Tooltip title={'login'}>
            <IconButton onClick={handleClick} color="inherit" size="large">
                <AccountCircle/>
            </IconButton>
        </Tooltip>
    );
}

export default connector(UserButton);