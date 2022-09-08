import React, {useMemo, useRef, useState} from 'react';
import {TestResource} from "../types/test.type";
import EventService from "../services/event.service";
import {EventResource} from "../types/event.type";
import {useParams} from "react-router-dom";
import {Button, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";

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

  const [uncategorizedItems, setUncategorizedItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [categorizedItems, setCategorizedItems] = useState<item[]>([]);
  const [users] = useState(['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8', 'User 9', 'User 10', 'User 11', 'User 12']);
  const testUser = 'User 5'

  function handleDeleteUncategorized(indexToDelete: number) {
    setUncategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete));
  }

  function handleDeleteCategorized(indexToDelete: number) {
    setCategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete));
  }

  function handleAdd(item: string) {

    if(item !== ''){
      const newList = uncategorizedItems.concat(item);
      setUncategorizedItems(newList);
      setText("");
    }
  }

  function addItemsToUser(item: string, index: number) {
    const newList = categorizedItems.concat({item: item, user: testUser});
    setCategorizedItems(newList);
    handleDeleteUncategorized(index);
    console.log(newList);
  }

  return (
    <div className="EventPage">
      <div id="main">
        <TableContainer style={{maxHeight: 450}}>
          <Table id={"userAndItems"} stickyHeader={true}>
            <TableHead>
              <TableRow>
                {users.map((user) =>
                  <TableCell>{user}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow id={'contentRow'}>
                {users.map((user) =>
                  <TableCell style={{verticalAlign: "top"}}>
                    {
                      categorizedItems.map((categorizedItem, index) =>
                          user === categorizedItem.user && (
                            <Stack direction={"column"}>
                              <Chip
                                key={index}
                                label={categorizedItem.item}
                                onDelete={() => handleDeleteCategorized(index)}
                                sx={{mt: 1}}
                                style={{maxWidth: 'max-content'}}
                              />
                            </Stack>
                          )
                      )
                    }
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack alignItems={"flex-end"} justifyContent={"center"} sx={{height: '30vh'}}>
          <div id={"uncategorizedItemList"}>
            {
              uncategorizedItems.map((uncategorizedItem, index) =>
                <Chip
                  key={index}
                  label={uncategorizedItem}
                  onDelete={() => handleDeleteUncategorized(index)}
                  sx={{mr: 1, mb: 1}}
                  onClick={() => addItemsToUser(uncategorizedItem, index)}
                />
              )}
          </div>
        </Stack>
        <Stack alignItems={"flex-end"} justifyContent={"center"} direction={"row"} sx={{height: '4vh'}}
               onKeyPress={(e) => e.key === 'Enter' && handleAdd(text)}>
          <TextField value={text} variant={"outlined"} className={"addItem"} id={"itemName"}
                     onChange={event => setText(event.target.value)}></TextField>
          <Button className={"addItem"} variant={"contained"} onClick={() => handleAdd(text)}>add</Button>
        </Stack>
      </div>
      <div id="footer"></div>
      <h1>{event.name}</h1>
    </div>

  );
}

export default Event;