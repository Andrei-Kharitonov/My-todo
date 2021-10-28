import React from "react";
import Box from "@mui/material/Box";
import CreateTodo from "../components/CreateTodo/CreateTodo";

function NewTodo() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Create todo</h2>
      <Box>
        <CreateTodo />
      </Box>
    </div>
  );
}

export default NewTodo;