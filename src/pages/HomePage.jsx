import React from "react";
import { useSelector } from "react-redux";
import TodoList from "../components/TodoList/TodoList";
import Statistics from "../components/Statistics/Statistics";

let styles = {
  ul: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  li: {
    boxSizing: "border-box",
    width: "265px",
    margin: "5px"
  },
  card: {
    marginBottom: "0"
  },
  cardInner: {
    display: "block"
  },
  cardContent: {},
  btn: {
    width: "100%",
    margin: "5px 0"
  }
};

let todoSlice = -1;

function HomePage() {
  let allTodos = useSelector(state => state.todo.todos);

  return (
    <div className="container">
      <h2 className="home-title">Welcome to My todo</h2>
      <div className="home-page">
        <fieldset className="statistic">
          <legend><h2>Statistics</h2></legend>
          <div className="container">
            <Statistics />
          </div>
        </fieldset>
        <fieldset className="last-todo">
          <legend><h2>Last todo</h2></legend>
          <div className="container">
            <TodoList allTodos={allTodos} styles={styles} todoSlice={todoSlice} />
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default HomePage;