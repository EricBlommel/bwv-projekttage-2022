import React, {useState} from 'react';
import './App.css';
import {
    Button, Chip,
    createTheme,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    ThemeProvider
} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})
// const theme = {
//     spacing: 8,
// }

function App() {

    const [uncategorizedItems, setuncategorizedItems] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    function handleDelete(indexToDelete: number) {
        setuncategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete))
    }

    function handleAdd(item: string) {
        const newList = uncategorizedItems.concat(item);

        setuncategorizedItems(newList);
        setText("");
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <body className="App">
            <div id="header"></div>
            <div id="main">
                <Table id={"userAndItems"}>
                    <TableBody>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div id={"uncategorizedItemList"}>
                    {uncategorizedItems.map((uncategorizedItem, index) =>
                        <Chip
                            key={uncategorizedItem}
                            label={uncategorizedItem}
                            onDelete={() => handleDelete(index)}
                            sx={{mr: 1, mb: 1}}
                        ></Chip>
                    )}
                </div>
                <TextField value={text} variant={"outlined"} className={"addItem"} id={"itemName"}
                           onChange={event => setText(event.target.value)}></TextField>
                <Button className={"addItem"} variant={"contained"} onClick={() => handleAdd(text)}>add</Button>
            </div>
            <div id="footer"></div>
            </body>
        </ThemeProvider>
    );
}

export default App;
