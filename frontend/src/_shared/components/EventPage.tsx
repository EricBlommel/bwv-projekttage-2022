import {Button, Chip, createTheme, Table, TableBody, TableCell, TableRow, TextField, ThemeProvider} from "@mui/material";
import React, {useState} from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

const lightTheme = createTheme({
  palette: {
    mode: "light"
  }
})

const theme = {
  spacing: 8,
}

function App() {

  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  function handleAdd(item: string) {
    const newList = items.concat(item);

    setItems(newList);
    setText("");
  }

  function handleDelete(item: string) {
    const newList = items.concat(item);

    setItems(newList);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <body className="App">
      <div id="header"></div>
      <div id="main">
        <Table id={"userAndItems"}>
          <TableBody>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>User</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {/*{items.map((row) =>*/}
            <TableRow>
              <TableCell>{/*row.item*/}</TableCell>
              <TableCell>{/*row.user*/}</TableCell>
            </TableRow>
            {/*)}*/}

          </TableBody>
        </Table>
        <div id={"uncategorizedItemList"}>
          {items.map((item) =>
            <Chip label={item} onDelete={handleDelete} sx={{mr: 1, mb: 1}}></Chip>
          )}
        </div>
        <TextField value={text} variant={"outlined"} className={"addItem"} id={"itemName"} onChange={event => setText(event.target.value)} ></TextField>
        <Button className={"addItem"} variant={"contained"} onClick={() => handleAdd(text)}>add</Button>
        {/*<Button className={"addItem"} variant={"contained"} onClick={() => handleAdd({item: "dings", user: "ebl"})}>add</Button>*/}
      </div>
      <div id="footer"></div>
      </body>
    </ThemeProvider>
  );
}

export default App;
