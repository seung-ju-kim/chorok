import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, Container, TextField, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const TodoForm = ({ addTodo }) => {
  console.log(addTodo);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  const changeText = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            variant="standard"
            label="I will do this"
            value={input}
            onChange={changeText}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 1 }}
          >
            ADD TODO
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default TodoForm;
