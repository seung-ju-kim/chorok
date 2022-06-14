import React from "react";
import Todos from "./Todos";
import { TextField, Box, Button } from "@mui/material";

const TodoList = ({ todos, checkTodo, deleteTodo }) => {
  return (
    <Box>
      {todos.map((item) => (
        <Todos
          key={item.id}
          todo={item.todo}
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
