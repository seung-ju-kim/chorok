import React from "react";
import ToDos from "./ToDos";
import { TextField, Box, Button } from "@mui/material";

const TodoList = ({ todos, checkTodo, deleteTodo }) => {
  return (
    <Box>
      {todos.map((item) => (
        <ToDos
          key={item.id}
          todo={item.content}
          checkTodo={checkTodo}
          id={item.id}
          isCompleted={item.isCompleted}
          deleteTodo={deleteTodo}
        />
      ))}
    </Box>
  );
};

export default TodoList;
