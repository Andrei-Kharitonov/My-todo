import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { redactTodo } from "../../store/reducers/todoSlice";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NewTodoCard from "../CreateTodo/NewTodoCard";

function Redact({ todoTitle, todoText, todoId, todoComp }) {
  let [inpValueTitle, setInpValueTitle] = useState(todoTitle);
  let [inpValueText, setInpValueText] = useState(todoText);
  let [loading, setLoading] = useState(false);
  let [alignment, setAlignment] = useState("title");
  let dispatch = useDispatch();

  function formHandler(event) {
    event.preventDefault();
    setLoading(true);

    let redactedTodo = {
      completed: todoComp,
      date: "Changed: " + new Date().toLocaleString(),
      title: inpValueTitle,
      text: inpValueText,
    };

    fetch(`https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos/${todoId}.json`, {
      method: "PUT",
      body: JSON.stringify(redactedTodo),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        redactedTodo.id = response.name;
        dispatch(redactTodo({ id: todoId, title: redactedTodo.title, text: redactedTodo.text }));
      })
      .then(() => setLoading(false));

  }

  function handleButtonChange(_event, newAlignment) {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
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
            Redact todo
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

Redact.propTypes = {
  todoTitle: PropTypes.string,
  todoText: PropTypes.string,
  todoId: PropTypes.string,
  todoComp: PropTypes.bool
};

export default Redact;