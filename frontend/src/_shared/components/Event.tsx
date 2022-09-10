import React, {useMemo, useRef, useState} from 'react';
import {TestResource} from "../types/test.type";
import EventService from "../services/event.service";
import {EventResource} from "../types/event.type";
import {useParams} from "react-router-dom";
import {Box, Button, Chip, Grid, IconButton, Input, InputAdornment, OutlinedInput, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {UserResource} from "../types/user.type";
import {ItemResource} from "../types/item.type";
import {Send} from "@mui/icons-material";

interface Props {
}

interface item {
  item: string;
  user: string;
}

function Event(props: Props) {

  let {id} = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<EventResource>({});

  const updateRef = useRef(() => {
    setLoading(true);
    new EventService()
      .getEvent(id!)
      .then((response: TestResource) => {
        setEvent(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  });

  //not in use
  const fetchData = useMemo(() => {
    updateRef.current();
    return true;
  }, [updateRef]);

  const [uncategorizedItems, setUncategorizedItems] = useState<string[]>(["test"]);
  const [text, setText] = useState<string>("");
  const [categorizedItems, setCategorizedItems] = useState<item[]>([]);
  const [users] = useState([]);

  return (
    <div>
      <Box sx={{margin: 4}}>
        <TableContainer component={Paper} sx={{minHeight: 400, maxHeight: 400}}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Benutzer</TableCell>
                <TableCell>Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.users && event.users!.map((user: UserResource) =>
                <TableRow>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{event.items!.filter((value: ItemResource) => value!.user!.id === user.id).map((item: ItemResource, index: number) => <Chip
                    key={index}
                    label={item.name}
                    onDelete={() => console.log()}
                    sx={{mt: 1}}
                    style={{maxWidth: 'max-content'}}
                  />)}</TableCell>
                </TableRow>)}
              <TableRow>
                <TableCell>User1</TableCell>
                <TableCell>User1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{margin: 4}}>
        <Paper sx={{minHeight: 300, maxHeight: 300}}>
          {
            uncategorizedItems.map((uncategorizedItem, index) =>
              <Chip
                key={index}
                label={uncategorizedItem}
                onDelete={() => console.log("delete")}
                sx={{margin: 2}}
                onClick={() => console.log("delete")}
              />
            )}
        </Paper>
      </Box>
      <Box alignItems="center" sx={{margin: 4}}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item >
            <OutlinedInput
              value={text}
              onChange={() => console.log()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => console.log()}
                    onMouseDown={() => console.log()}
                  >
                    <Send/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
      <h1>{event.name}</h1>
      <Button onClick={() => console.log(event)}>test</Button>
    </div>
  );
}

export default Event;