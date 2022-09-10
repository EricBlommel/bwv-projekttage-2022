import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import {Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Props {
}

function UserButton(props: Props) {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/signin`;
        navigate(path);
    }

    return (
        <Tooltip title={'login'}>
            <IconButton onClick={routeChange} color="inherit" size="large">
                <AccountCircle/>
            </IconButton>
        </Tooltip>
    );
}

export default UserButton;