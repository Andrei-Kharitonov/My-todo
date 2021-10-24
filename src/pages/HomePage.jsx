import React from "react";
import LastTodoList from "../components/LastTodo/LastTodoList";
import Statistics from "../components/Statistics/Statistics";

function HomePage() {
  return (
    <div className="container">
      <h2 className="home-title">Create new todos<br />or see existing ones!</h2>
      <fieldset>
        <legend><h2>Statistics</h2></legend>
        <div className="container">
          <Statistics />
        </div>
      </fieldset>
      <fieldset>
        <legend><h2>Last todo</h2></legend>
        <div className="container">
          <LastTodoList />
        </div>
      </fieldset>
    </div>
  );
}

export default HomePage;