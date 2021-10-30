import React from "react";
import { fetchAddTodo } from "../store/reducers/todoMiddleware";
import Box from "@mui/material/Box";
import TodoInput from "../components/TodoInput/TodoInput";

function NewTodo() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Create todo</h2>
      <Box>
        <TodoInput
          initialState={{ title: "", text: "", id: "", completed: false }}
          todoDispatch={fetchAddTodo}
        />
      </Box>
    </div>
  );
}

export default NewTodo;