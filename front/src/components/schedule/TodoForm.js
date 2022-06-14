import React, { useState, useEffect } from "react";
import {
  FormControl,
  Container,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";

import * as Api from "../../api";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("schedules/post", {
        todo,
      });
    } catch (err) {
      if (err.response.status === 400) {
      }
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  return (
    <Box sx={{ mb: 5 }}>
      <Typography sx={{ mb: 3 }} fontWeight="bold" fontSize="7vw">
        오늘 할 일
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            variant="outlined"
            color="success"
            label="I will do this"
            value={todo}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, bgcolor: "#64a68a" }}
          >
            ADD TODO
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TodoForm;
