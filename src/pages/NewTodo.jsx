import React from "react";
import Box from "@mui/material/Box";
import CreateTodo from "../components/CreateTodo/CreateTodo";

function NewTodo() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create todo</h2>
      <Box
        sx={{
          width: 900,
          maxWidth: "100%",
        }}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CreateTodo />
      </Box>
    </div>
  );
}

export default NewTodo;