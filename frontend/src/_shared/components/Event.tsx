import React, {ChangeEvent, useMemo, useRef, useState} from 'react';
import EventService from "../services/event.service";
import {EventResponse} from "../types/event.type";
import {useParams} from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  Chip, CircularProgress,
  Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {UserResource, UserResponse} from "../types/user.type";
import {ItemResource, ItemResponse} from "../types/item.type";
import {Send} from "@mui/icons-material";
import AuthService from "../services/auth.service";
import ItemService from "../services/item.service";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Event() {

  let {id} = useParams();
  let currentUser = AuthService.getCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<EventResponse>({});

  const updateRef = useRef(() => {
    setLoading(true);
    new EventService()
      .getEvent(id!)
      .then((response: EventResponse) => {
        setEvent(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  });

  const fetchData = useMemo(() => {
    updateRef.current();
    return true;
  }, [updateRef]);

  const handleEnterEvent = () => {
    setLoading(true);
    new EventService()
      .addUserToEvent(id!, {id: currentUser.id})
      .then((response: EventResponse) => {
        setEvent(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleAddItem = () => {
    if (itemText.length > 0) {
      setLoading(true);
      new EventService()
        .addItemToEvent(id!, {name: itemText, userId: undefined})
        .then((response: EventResponse) => {
          setEvent(response);
          setItemText("")
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  const handleDeleteItem = (id: string) => {
    setLoading(true);
    new ItemService()
      .deleteById(id)
      .then((response: string) => {
        updateRef.current();
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleUpdateItem = (itemId: string, userId?: string) => {
    setLoading(true);
    if (userId) {
      new ItemService()
        .updateItemAddUser(itemId, userId)
        .then((response: ItemResource) => {
          updateRef.current();
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      new ItemService()
        .updateItemRemoveUser(itemId)
        .then((response: ItemResource) => {
          updateRef.current();
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  const sortItems = (a: ItemResponse, b: ItemResponse) => {
    if (a.name! > b.name!) {
      return 1;
    }

    if (a.name! < b.name!) {
      return -1;
    }

    return 0;
  }

  const sortUsers = (a: UserResponse, b: UserResponse) => {
    if (a.username! > b.username!) {
      return 1;
    }

    if (a.username! < b.username!) {
      return -1;
    }

    return 0;
  }

  const [itemText, setItemText] = useState<string>("");

  return (
    <>
      <Backdrop
        //sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Dialog open={event.users !== undefined && !event.users!.some((user) => user.id === currentUser.id)} fullWidth maxWidth="xs">
        <DialogTitle>
          {event.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchtest du dem Ereignis beitreten?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleEnterEvent}>Beitreten</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Box sx={{margin: 4}}>
        <TableContainer component={Paper} sx={{minHeight: 400, maxHeight: 400}}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Benutzer</StyledTableCell>
                <StyledTableCell>Gegenstände</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.users && event.users!.sort(sortUsers).map((user: UserResource, index: number) =>
                <TableRow key={index}>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{event.items && event.items!.filter((value: ItemResource) => value.user && value!.user!.id === user.id).sort(sortItems).map((item: ItemResource, index: number) =>
                    <Chip
                      key={index}
                      label={item.name}
                      onDelete={() => handleUpdateItem(item.id!)}
                      sx={{marginRight: 1}}
                      style={{maxWidth: 'max-content'}}
                    />)}
                  </StyledTableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{margin: 4}}>
        <Paper sx={{minHeight: 300, maxHeight: 300, paddingInlineEnd: 2, overflow: 'auto'}}>
          {
            event.items && event.items!.filter((value: ItemResponse) => !value!.user).sort(sortItems).map((item: ItemResource, index: number) =>
              <Chip
                key={index}
                label={item.name}
                onDelete={() => handleDeleteItem(item.id!)}
                sx={{marginLeft: 2, marginTop: 2}}
                onClick={() => handleUpdateItem(item.id!, AuthService.getCurrentUser().id)}
              />
            )}
        </Paper>
      </Box>
      <Box alignItems="center" sx={{margin: 4}}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <OutlinedInput
              value={itemText}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setItemText(event.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="add item button"
                    onClick={handleAddItem}
                    onMouseDown={handleAddItem}
                  >
                    <Send/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Event;