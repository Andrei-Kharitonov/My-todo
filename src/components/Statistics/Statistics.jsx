import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Statistics() {
  let todos = useSelector(state => state.todo.todos);
  let loading = useSelector(state => state.todo.loading);

  let total = todos.length;
  let completed = todos.filter(todo => todo.completed !== false).length;
  let uncompleted = todos.filter(todo => todo.completed !== true).length;

  if (loading) {
    return (
      <>
        <h3 className="stats">
          <AssignmentOutlinedIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Total todo:&nbsp;
          <CircularProgress size={20} />
        </h3>
        <h3 className="stats">
          <DoneOutlineIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Completed:&nbsp;
          <CircularProgress size={20} />
        </h3>
        <h3 className="stats">
          <AccessTimeIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Not completed:&nbsp;
          <CircularProgress size={20} />
        </h3>
      </>
    );
  } else {
    return (
      <>
        <h3 className="stats">
          <AssignmentOutlinedIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Total todo:&nbsp;{total}
        </h3>
        <h3 className="stats">
          <DoneOutlineIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Completed:&nbsp;{completed}
        </h3>
        <h3 className="stats">
          <AccessTimeIcon style={{ marginBottom: "-5px" }} />&nbsp;
          Not completed:&nbsp;{uncompleted}
        </h3>
      </>
    );
  }
}

export default Statistics;