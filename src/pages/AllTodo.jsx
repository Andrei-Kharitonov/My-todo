import React from "react";
import TodoList from "../components/TodoList/TodoList";

let styles = {
  ul: {
    listStyleType: "none",
    padding: 0
  },
  li: {},
  card: {},
  cardInner: {},
  cardContent: {
    width: "100%"
  },
  btn: {
    width: "100%",
    margin: "5px 0"
  }
};

let todoSlice = 0;

function AllTodo() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>View all todo</h2>
      <TodoList styles={styles} todoSlice={todoSlice} />
    </div>
  );
}

export default AllTodo;