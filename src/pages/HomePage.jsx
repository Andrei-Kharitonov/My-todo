import React from "react";
import LastTodoList from "../components/LastTodo/LastTodoList";

function HomePage() {
  return (
    <div className="container">
      <h2 className="home-title">Create new todos<br />or see existing ones!</h2>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Last todo:</h2>
        <LastTodoList />
      </div>
    </div>
  );
}

export default HomePage;