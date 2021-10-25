import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addTodo } from "../../reducers/todo.reducer";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NewTodoCard from "./NewTodoCard";

function CreateTodo() {
  let [inpValueTitle, setInpValueTitle] = useState("");
  let [inpValueText, setInpValueText] = useState("");
  let [loading, setLoading] = useState(false);
  let [alignment, setAlignment] = useState("title");
  let dispatch = useDispatch();

  function formHandler(event) {
    event.preventDefault();
    setLoading(true);

    let newTodo = {
      completed: false,
      date: new Date().toLocaleString(),
      title: inpValueTitle,
      text: inpValueText,
    };

    fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        newTodo.id = response.name;
        dispatch(addTodo(newTodo));
      })
      .then(() => setLoading(false));

    setInpValueTitle("");
    setInpValueText("");
  }

  function handleButtonChange(_event, newAlignment) {
    setAlignment(newAlignment);
    if (!newAlignment) {
      setAlignment("title");
    }
  };

  let inputType = () => {
    switch (alignment) {
      case "title":
        return (
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Todo title"
            id="InpTodoTitle"
            value={inpValueTitle}
            onChange={event => setInpValueTitle(event.target.value)}
          />
        );

      case "text":
        return (
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Todo text"
            id="InpTodoText"
            value={inpValueText}
            onChange={event => setInpValueText(event.target.value)}
          />
        );
    }
  };

  return (
    <div className="container">
      <form onSubmit={formHandler}>
        {inputType()}
        <div className="buttons">
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            id="newTodoBtn"
            style={{ marginRight: "6px", whiteSpace: "nowrap" }}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
          >
            Create todo
          </LoadingButton>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleButtonChange}
          >
            <ToggleButton value="title">Title</ToggleButton>
            <ToggleButton value="text">Text</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </form>
      <NewTodoCard
        title={inpValueTitle}
        text={inpValueText}
      />
    </div>
  );
}

CreateTodo.propTypes = {
  inputValueTitle: PropTypes.string,
  inputValueText: PropTypes.string,
  loading: PropTypes.bool,
  alignment: PropTypes.oneOf(["title", "text"]),
  newTodo: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    completed: PropTypes.bool
  }),
  inputType: PropTypes.func,
  formHandler: PropTypes.func
};

export default CreateTodo;