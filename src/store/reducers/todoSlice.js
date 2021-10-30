import { createSlice } from "@reduxjs/toolkit";
import { fetchGetTodos, fetchAddTodo, fetchRedactTodo } from "./todoMiddleware";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: true
  },
  reducers: {
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchAddTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload];
      })
      .addCase(fetchRedactTodo.fulfilled, (state, action) => {
        let id = action.payload.id;
        console.log(action);
        state.todos = state.todos.map(todo => todo.id == id
          ? Object.assign({}, todo, {
            title: action.payload.title,
            text: action.payload.text,
            date: action.payload.date
          })
          : todo);
      });
  }
});

export const { setLoading, deleteTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;