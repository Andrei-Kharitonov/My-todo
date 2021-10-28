import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TodoList from "../components/TodoList/TodoList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
//import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


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

let fabStyle = {
  position: "fixed",
  right: "20px",
  bottom: "30px"
};

let todoSlice = 0;

function AllTodo() {
  let [sort, setSort] = useState("all");
  let [search, setSearch] = useState("");
  let allTodos = useSelector(state => state.todo.todos);
  let completeTodo = allTodos.filter(todo => todo.completed === true);
  let notCompleteTodo = allTodos.filter(todo => todo.completed === false);
  let [selectTodos, setSelectTodos] = useState(allTodos);
  let [searchedTodo, setSearchedTodo] = useState(selectTodos);

  useEffect(() => {
    if (sort == "all") {
      setSelectTodos(allTodos);
      setSearchedTodo(allTodos.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
    } else if (sort == "completed") {
      setSelectTodos(allTodos.filter(todo => todo.completed === true));
      setSearchedTodo(completeTodo.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
    } else if (sort == "notCompleted") {
      setSelectTodos(allTodos.filter(todo => todo.completed === false));
      setSearchedTodo(notCompleteTodo.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, allTodos]);

  function handleSortChange(event) {
    setSort(event.target.value);
  };

  function searchTodo(todos, search) {
    setSearchedTodo(todos.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
  }

  return (
    <div className="container">
      <fieldset className="sort">
        <legend><h2>Sort todo</h2></legend>
        <FormControl component="fieldset" style={{ display: "block", width: "100%" }}>
          <RadioGroup
            className="sort-todo"
            row
            style={{ marginBottom: "15px" }}
            aria-label="sort todo"
            name="row-radio-buttons-group"
            value={sort}
            onChange={handleSortChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All todo" />
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="notCompleted" control={<Radio />} label="Not completed" />
          </RadioGroup>
          <TextField
            id="search"
            label="search todo"
            variant="outlined"
            fullWidth
            value={search}
            onInput={event => {
              setSearch(event.target.value);
              searchTodo(selectTodos, event.target.value);
            }}
          />
        </FormControl>
      </fieldset>
      <TodoList allTodos={searchedTodo} styles={styles} todoSlice={todoSlice} />
      <Fab
        style={fabStyle}
        color="primary"
        aria-label="expand"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpwardIcon />
      </Fab>
    </div >
  );
}

export default AllTodo;