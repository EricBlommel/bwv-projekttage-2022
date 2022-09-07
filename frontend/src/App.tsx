import React, {useState} from 'react';
import './App.css';
import {
    Button, Chip,
    createTheme, Grid, Stack,
    Table,
    TableBody,
    TableCell, TableContainer, TableHead,
    TableRow,
    TextField,
    ThemeProvider
} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

interface item {
    item: string;
    user: string;
}

function App() {

    const [uncategorizedItems, setUncategorizedItems] = useState<string[]>([]);
    const [text, setText] = useState<string>("");
    const [categorizedItems, setCategorizedItems] = useState<item[]>([]);
    const [users] = useState(['User 1', 'User 2', 'User 3', 'User 4']);
    const testUser = 'User 3'

    function handleDeleteUncategorized(indexToDelete: number) {
        setUncategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete));
    }

    function handleDeleteCategorized(indexToDelete: number) {
        setCategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete));
    }

    function handleAdd(item: string) {
        const newList = uncategorizedItems.concat(item);

        setUncategorizedItems(newList);
        setText("");
    }

    function addItemsToUser(item: string, index: number) {
        const newList = categorizedItems.concat({item: item, user: testUser});
        setCategorizedItems(newList);
        handleDeleteUncategorized(index);
        console.log(newList);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <div id="header"></div>
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
                                        <TableCell>
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
                    <Stack alignItems={"flex-end"} justifyContent={"center"} direction={"row"} sx={{height: '4vh'}}>
                        <TextField value={text} variant={"outlined"} className={"addItem"} id={"itemName"}
                                   onChange={event => setText(event.target.value)}></TextField>
                        <Button className={"addItem"} variant={"contained"} onClick={() => handleAdd(text)}>add</Button>
                    </Stack>
                </div>
                <div id="footer"></div>
            </div>
        </ThemeProvider>
    );
}

export default App;
