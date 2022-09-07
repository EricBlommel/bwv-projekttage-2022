import React, {ChangeEvent} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, TextField
} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { Navigate } from 'react-router-dom';

function AddEventButton() {

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
    handleClose();
    setSuccess(true);
  }

  return (
    <div>
      <IconButton size="large" onClick={handleClickOpen}>
        <AddCircle fontSize="large"/>
      </IconButton>
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

      {success && (<Navigate to="/event/id?123"/>)}
    </div>
  );
}

export default AddEventButton;
