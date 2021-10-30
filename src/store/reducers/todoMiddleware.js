import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetTodos = createAsyncThunk("todo/fetchTodos", async () => {
  return fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      }
    })
    .catch(error => alert(error.message));
});

export const fetchAddTodo = createAsyncThunk("todo/fetchAddTodo", async (todoState) => {
  let newTodo = {
    completed: todoState.completed,
    date: "Date: " + new Date().toLocaleString(),
    title: todoState.title,
    text: todoState.text
  };

  return fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      newTodo.id = response.name;
      return newTodo;
    })
    .catch(error => alert(error.message));
});

export const fetchRedactTodo = createAsyncThunk("todo/fetchRedactTodo", async (todoState) => {
  let redactedTodo = {
    completed: todoState.completed,
    date: "Changed: " + new Date().toLocaleString(),
    title: todoState.title,
    text: todoState.text,
    id: todoState.id
  };

  return fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${todoState.id}.json`, {
    method: "PUT",
    body: JSON.stringify(redactedTodo),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(() => redactedTodo)
    .catch(error => alert(error.message));
});