import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TodoList from "../components/TodoList/TodoList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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
  let [sort, setSort] = useState("all");
  let allTodos = useSelector(state => state.todo.todos);
  let completeTodo = allTodos.filter(todo => todo.completed === true);
  let notCompleteTodo = allTodos.filter(todo => todo.completed === false);
  let [selectTodos, setSelectTodos] = useState(allTodos);

  useEffect(() => {
    if (sort == "all") {
      setSelectTodos(allTodos);
    } else if (sort == "completed") {
      setSelectTodos(completeTodo);
    } else if (sort == "notCompleted") {
      setSelectTodos(notCompleteTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, allTodos]);

  function handleSortChange(event) {
    setSort(event.target.value);
  };

  return (
    <div className="container">
      <fieldset className="sort">
        <legend><h2>Sort todo</h2></legend>
        <FormControl component="fieldset">
          <RadioGroup
            className="sort-todo"
            row
            aria-label="sort todo"
            name="row-radio-buttons-group"
            value={sort}
            onChange={handleSortChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All todo" />
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="notCompleted" control={<Radio />} label="Not completed" />
          </RadioGroup>
        </FormControl>
      </fieldset>
      <TodoList allTodos={selectTodos} styles={styles} todoSlice={todoSlice} />
    </div>
  );
}

export default AllTodo;