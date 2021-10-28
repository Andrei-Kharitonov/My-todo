import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/reducers/todoSlice";
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
      date: "Date: " + new Date().toLocaleString(),
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
      .then(() => setLoading(false))
      .catch(error => alert(error.message));

    setInpValueTitle("");
    setInpValueText("");
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
            label="Title.."
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
            label="Text.."
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
            className="btn-group"
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

export default CreateTodo;