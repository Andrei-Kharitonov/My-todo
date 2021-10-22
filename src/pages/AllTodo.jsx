import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TodoList from "../components/TodoList/TodoList";
import Context from "../components/context";

function AllTodo() {
  let [todos, setTodos] = useState("load");

  function completeTodo(id) {
    setTodos(todos.map(todo => todo.id == id ? Object.assign({}, todo, { completed: true }) : todo));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/completed.json`, {
      method: "PUT",
      body: JSON.stringify(true),
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  useEffect(() => {
    fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          return setTodos(
            Object.keys(response).map(
              key => ({ ...response[key], id: key })
            )
          );
        } else { return setTodos([]); }
      });
  }, []);

  return (
    <Context.Provider value={{ removeTodo, completeTodo }}>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>View all todo</h2>
        <TodoList todo={todos} />
      </div>
    </Context.Provider>
  );
}

AllTodo.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
  completeTodo: PropTypes.func,
  removeTodo: PropTypes.func
};

export default AllTodo;