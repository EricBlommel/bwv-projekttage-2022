import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useState} from "react";
import {Tooltip} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6000} ref={ref} variant="filled" {...props} />;
});

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
            <Tooltip title="Copy Url">
                <IconButton onClick={copy} color="inherit" size="large">
                    <ContentCopyIcon/>
                </IconButton>
            </Tooltip>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
                    Url copied!
                </Alert>
            </Snackbar>
        </Stack>

    );
}


export default CopyButton;