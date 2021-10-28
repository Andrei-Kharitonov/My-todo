import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodosFromDB, setLoading } from "./store/reducers/todoSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./components/TabPanel";
import HomePage from "./pages/HomePage";
import NewTodo from "./pages/NewTodo";
import AllTodo from "./pages/AllTodo";

function App() {
  let [tabValue, setTabValue] = React.useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          let todos = Object.keys(response).map(key => ({ ...response[key], id: key }));
          dispatch(addTodosFromDB(todos));
        }
      })
      .then(() => dispatch(setLoading(false)))
      .catch(error => alert(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabChange(_event, newTabValue) {
    setTabValue(newTabValue);
  };

  return (
    <div>
      <h1 className="title">My todo</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Main" />
            <Tab label="New todo" />
            <Tab label="All todo" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <HomePage />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <NewTodo />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AllTodo />
        </TabPanel>
      </Box>
    </div>
  );
}

export default hot(App);