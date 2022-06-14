import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Check, Delete } from "@mui/icons-material";

const Todos = ({ todo, checkTodo, id, isCompleted, deleteTodo }) => {
  const markComplete = () => checkTodo(id);
  const delTodo = () => deleteTodo(id);

  const todoStyle = isCompleted
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };

  const cardStyle = {
    mt: 5,
    bgcolor: "#e0e0e0",
    borderRadius: 2,
    height: "5vh",
  };

  const iconStyle = {
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container>
      <Card variant="outlined" sx={cardStyle}>
        <CardContent sx={{ my: "auto" }}>
          <Typography variant="h5" component="h2" sx={{ todoStyle }}>
            <IconButton onClick={markComplete}>
              <Check sx={{ color: "green" }} />
            </IconButton>
            {todo}
            <IconButton sx={{ float: "right" }} onClick={delTodo}>
              <Delete sx={{ color: "red" }} />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Todos;
