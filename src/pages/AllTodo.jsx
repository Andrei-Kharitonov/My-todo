import React from "react";
import TodoList from "../components/TodoList/TodoList";

function AllTodo() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>View all todo</h2>
      <TodoList />
    </div>
  );
}

export default AllTodo;