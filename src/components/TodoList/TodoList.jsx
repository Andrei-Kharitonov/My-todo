import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TodoCard from "./TodoCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function TodoList({ allTodos, styles, todoSlice }) {
  // let allTodos = useSelector(state => state.todo.todos);
  let loading = useSelector(state => state.todo.loading);
  // let todos = allTodos.slice(todoSlice);
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
  todos: PropTypes.array,
  loading: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
  styles: PropTypes.object,
  todoSlice: PropTypes.number,
  length: PropTypes.object,
  map: PropTypes.object
};

export default TodoList;