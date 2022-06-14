import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

const ToDo = () => {
  const mockData = [
    {
      id: 1,
      content: "bla",
      isCompleted: false,
    },
  ];

  const [todos, setTodos] = useState(mockData);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Box sx={{ mt: 13 }}>
      <TodoForm />
      <TodoList todos={todos} />
    </Box>
  );
};

export default ToDo;
