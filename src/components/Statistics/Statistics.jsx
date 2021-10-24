import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function Statistics() {
  let todos = useSelector(state => state.todo.todos);
  let loading = useSelector(state => state.todo.loading);

  let total = todos.length;
  let completed = todos.filter(todo => todo.completed !== false).length;
  let uncompleted = todos.filter(todo => todo.completed !== true).length;

  if (loading) {
    return (
      <>
        <h3 className="stats">Total todo: <CircularProgress size={20} /></h3>
        <h3 className="stats">Completed todo: <CircularProgress size={20} /></h3>
        <h3 className="stats">Uncompleted todo: <CircularProgress size={20} /></h3>
      </>
    );
  } else {
    return (
      <>
        <h3 className="stats">Total todo: {total}</h3>
        <h3 className="stats">Completed todo: {completed}</h3>
        <h3 className="stats">Uncompleted todo: {uncompleted}</h3>
      </>
    );
  }
}

export default Statistics;