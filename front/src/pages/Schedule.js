import React from "react";
import { Box } from "@mui/material";
import TodoForm from "../components/schedule/TodoForm";
import TodoList from "../components/schedule/TodoList";

function Schedule() {
  return (
    <Box sx={{ my: 10, px: 3 }}>
      <TodoForm />
      <TodoList />
    </Box>
  );
}

export default Schedule;
