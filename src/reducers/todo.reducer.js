import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: true
  },
  reducers: {
    addTodosFromDB: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    deleteTodo: (state, action) => {
      let id = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    completeTodo: (state, action) => {
      let id = action.payload;
      state.todos = state.todos.map(todo => todo.id == id ? Object.assign({}, todo, { completed: true }) : todo);
    },
    redactTodo: (state, action) => {
      let id = action.payload.id;
      state.todos = state.todos.map(todo => todo.id == id
        ? Object.assign({}, todo, { title: action.payload.title, text: action.payload.text })
        : todo);
      console.log(action.payload.id, action.payload.title, action.payload.text);
    }
  }
});

export const { addTodosFromDB, addTodo, setLoading, deleteTodo, completeTodo, redactTodo } = todoSlice.actions;

export default todoSlice.reducer;