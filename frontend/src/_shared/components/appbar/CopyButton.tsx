import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {useState} from "react";
import {Alert, Tooltip} from "@mui/material";

function CopyButton() {

    const [open, setOpen] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
    }

    function copy() {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setOpen(true);
    }

    return (
        <Stack>
            <Tooltip title="URL in Zwischenablage kopieren">
                <IconButton onClick={copy} color="inherit" size="large">
                    <ContentCopyIcon/>
                </IconButton>
            </Tooltip>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="URL wurde in die Zwischenablage kopiert"/>
        </Stack>

    );
}


export default CopyButton;