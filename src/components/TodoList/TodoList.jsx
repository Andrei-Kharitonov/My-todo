import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TodoCard from "./TodoCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function TodoList({ allTodos, styles, todoSlice }) {
  let loading = useSelector(state => state.todo.loading);
  let todos = allTodos.slice(todoSlice);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (todos.length == 0) {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px", color: "#2196f3" }}>No todo!</h3>
    );
  } else {
    return (
      <ul style={styles.ul}>
        {todos.map((todo) => {
          return (
            <li key={todo.id} style={styles.li}>
              <TodoCard
                title={todo.title}
                text={todo.text}
                date={todo.date}
                id={todo.id}
                completed={todo.completed}
                styles={styles}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

TodoList.propTypes = {
  allTodos: PropTypes.array,
  styles: PropTypes.object,
  todoSlice: PropTypes.number,
};

export default TodoList;