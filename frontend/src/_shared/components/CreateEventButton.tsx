import React, {ChangeEvent} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, TextField, Tooltip
} from "@mui/material";
import {Add} from "@mui/icons-material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { Navigate } from 'react-router-dom';
import {EventResource} from "../types/event.type";
import EventService from "../services/event.service";

const fabStyle = {
  position: 'absolute',
  bottom: 32,
  right: 32,
};

function CreateEventButton() {

    const [open, setOpen] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [date, setDate] = React.useState<Dayjs | null>(
        dayjs(),
    );
    const [description, setDescription] = React.useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name);
    };

    const handleChangeDate = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

  const handleSubmit = () => {

    const event: EventResource = {name: name, beginsAt: date?.toDate(), description: description}

    new EventService()
      .createEvent(event)
      .then((response: EventResource) => {
        setRedirectID(response.id);
      })
    handleClose();
  }

  return (
    <div>
      <Fab color="primary" size="large" onClick={handleClickOpen} sx={fabStyle}>
        <Add fontSize="large"/>
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Ereignis erstellen</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            onChange={handleChangeName}
            autoFocus
            margin="dense"
            placeholder="Gebe deinem Ereignis einen Namen"
            id="name"
            label="Name"
            fullWidth
            variant="standard"/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Datum"
              onChange={handleChangeDate}
              inputFormat="MM/DD/YYYY"
              value={date}
              renderInput={(params) => <TextField {...params} fullWidth variant="standard" margin="dense" id="date"/>}
            />
          </LocalizationProvider>
          <TextField
            value={description}
            onChange={handleChangeDescription}
            label="Beschreibung"
            fullWidth
            variant="standard"
            margin="dense"
            placeholder="Beschreibe das Ereignis in ein paar Worten"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleSubmit}>Erstellen</Button>
        </DialogActions>
      </Dialog>

      {redirectID && (<Navigate to={"/event/" + redirectID}/>)}
    </div>
  );
}

export default CreateEventButton;
