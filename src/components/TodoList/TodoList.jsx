import React from "react";
import PropTypes from "prop-types";
import TodoCard from "./TodoCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function TodoList({ todo }) {
  if (todo == "load") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (todo.length > 0) {
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todo.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoCard
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
  } else {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px" }}>No todo!</h3>
    );
  }
}

TodoList.propTypes = {
  todo: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
  length: PropTypes.object,
  map: PropTypes.object
};

export default TodoList;