import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import LastTodoCard from "./LastTodoCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LastTodoList() {
  let todos = useSelector(state => state.todo.todos);
  let lastTodos = todos.slice(-3);
  let loading = useSelector(state => state.todo.loading);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (lastTodos.length == 0) {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px" }}>No todo!</h3>
    );
  } else {
    return (
      <ul className="lastTodos">
        {lastTodos.map((todo) => {
          return (
            <li key={todo.id} className="lastTodos__card">
              <LastTodoCard
                title={todo.title}
                text={todo.text}
                date={todo.date}
                id={todo.id}
                completed={todo.completed}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

LastTodoList.propTypes = {
  todo: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
  length: PropTypes.object,
  map: PropTypes.object
};

export default LastTodoList;