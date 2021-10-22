import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LastTodoList from "../components/LastTodo/LastTodoList";
import Context from "../components/context";

function HomePage() {
  let [todos, setTodos] = useState("load");

  function completeTodo(id) {
    setTodos(todos.map(todo => todo.id == id ? Object.assign({}, todo, { completed: true }) : todo));

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/completed.json`, {
      method: "PUT",
      body: JSON.stringify("true"),
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
          let todos = Object.keys(response).map(
            key => ({ ...response[key], id: key })
          );
          let lastTodos = setTodos(todos.slice(-3));
          return lastTodos;
        } else { return setTodos([]); }
      });
  }, []);

  return (
    <div className="container">
      <h2 className="home-title">Create new todos<br />or see existing ones!</h2>
      <Context.Provider value={{ removeTodo, completeTodo }}>
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Last todo:</h2>
          <LastTodoList todo={todos} />
        </div>
      </Context.Provider>
    </div>
  );
}

HomePage.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  completeTodo: PropTypes.func,
  removeTodo: PropTypes.func
};

export default HomePage;