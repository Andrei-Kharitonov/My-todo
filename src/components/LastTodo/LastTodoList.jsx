import React from "react";
import PropTypes from "prop-types";
import LastTodoCard from "./LastTodoCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LastTodoList({ todo }) {
  if (todo == "load") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (todo.length > 0) {
    return (
      <ul className="lastTodoCard">
        {todo.map((todo) => {
          return (
            <li key={todo.id} style={{ boxSizing: "border-box", margin: "10px" }}>
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
  } else {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px" }}>No todo!</h3>
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