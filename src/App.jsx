import { hot } from "react-hot-loader/root";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./components/TabPanel";
import HomePage from "./pages/HomePage";
import NewTodo from "./pages/NewTodo";
import AllTodo from "./pages/AllTodo";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="title">My todo list</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Main" />
            <Tab label="New todo" />
            <Tab label="All todo" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HomePage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NewTodo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllTodo />
        </TabPanel>
      </Box>
    </div>
  );
}

App.propTypes = {
  value: PropTypes.number
};

export default hot(App);