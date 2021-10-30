import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetTodos } from "./store/reducers/todoMiddleware";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./components/TabPanel/TabPanel";
import HomePage from "./pages/HomePage";
import NewTodo from "./pages/NewTodo";
import AllTodo from "./pages/AllTodo";

function App() {
  let [tabValue, setTabValue] = React.useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTodos());
  }, [dispatch]);

  function handleTabChange(_event, newTabValue) {
    setTabValue(newTabValue);
  };

  return (
    <div>
      <h1 className="title">My todo</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} style={{ position: "sticky", top: "0", backgroundColor: "#fff", zIndex: "1000" }}>
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