import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodosFromDB, setLoading } from "./reducers/todo.reducer";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HomePage from "./pages/HomePage";
import NewTodo from "./pages/NewTodo";
import AllTodo from "./pages/AllTodo";

function App() {
  let dispatch = useDispatch();

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
          let todos = Object.keys(response).map(key => ({ ...response[key], id: key }));
          dispatch(addTodosFromDB(todos));
        }
      })
      .then(() => dispatch(setLoading(false)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="title">My todo</h1>
        <Route
          path="/"
          render={({ location }) => (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={location.pathname} centered>
                  <Tab label="Main" value="/" component={Link} to={"/"} />
                  <Tab label="New todo" value="/new_todo" component={Link} to={"/new_todo"} />
                  <Tab label="All todo" value="/all_todo" component={Link} to={"/all_todo"} />
                </Tabs>
              </Box>
              <Switch>
                <Route path={"/new_todo"} render={() => <NewTodo />} />
                <Route path={"/all_todo"} render={() => <AllTodo />} />
                <Route path={"/"} render={() => <HomePage />} />
              </Switch>
            </Box>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default hot(App);