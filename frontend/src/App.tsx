import React, {useState} from 'react';
import './App.css';
import {
    Button, Chip,
    createTheme,
    Table,
    TableBody,
    TableCell, TableHead,
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

    const [uncategorizedItems, setUncategorizedItems] = useState<string[]>([]);
    const [text, setText] = useState<string>("");
    const [categorizedItems, setCategorizedItems] = useState<string[]>([]);

    function handleDeleteUncategorized(indexToDelete: number) {
        setUncategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete))
    }

    function handleDeleteCategorized(indexToDelete: number) {
        setCategorizedItems(uncategorizedItems => uncategorizedItems.filter((value, index: number) => index !== indexToDelete))
    }

    function handleAdd(item: string) {
        const newList = uncategorizedItems.concat(item);

        setUncategorizedItems(newList);
        setText("");
    }

    function addItemsToUser(item: string, index: number) {
        const newList = categorizedItems.concat(item);
        setCategorizedItems(newList)
        handleDeleteUncategorized(index)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <body className="App">
            <div id="header"></div>
            <div id="main">
                <Table id={"userAndItems"}>
                    <TableHead>
                        <TableRow>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {
                                    categorizedItems.map((categorizedItem, index) =>
                                        <Chip
                                            key={categorizedItem}
                                            label={categorizedItem}
                                            onDelete={() => handleDeleteCategorized(index)}
                                            sx={{mt: 1}}
                                        ></Chip>
                                    )
                                }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div id={"uncategorizedItemList"}>
                    {
                        uncategorizedItems.map((uncategorizedItem, index) =>
                            <Chip
                                key={uncategorizedItem}
                                label={uncategorizedItem}
                                onDelete={() => handleDeleteUncategorized(index)}
                                sx={{mr: 1, mb: 1}}
                                onClick={() => addItemsToUser(uncategorizedItem, index)}
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
