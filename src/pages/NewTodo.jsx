import React from "react";
import Box from "@mui/material/Box";
import CreateTodo from "../components/CreateTodo/CreateTodo";

function NewTodo() {
  return (
    <Box sx={{ p: 3 }} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Create todo</h2>
        <CreateTodo />
      </div >
    </Box >
  );
}

export default NewTodo;