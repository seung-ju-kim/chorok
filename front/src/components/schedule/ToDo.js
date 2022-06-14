import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3003",
  });

  const TODO = "/todos";

  const getTodos = async () => {
    await api
      .get(TODO)
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (input) => {
    const addTodo = async () => {
      await api
        .post(TODO, { todo: input, isCompleted })
        .then((res) => {
          console.log("res.data :", res.data);
          console.log("res.data.todo :", res.data.todo);
          setTodos([...todos, res.data]);
        })
        .catch((err) => console.error(err));
    };
    addTodo();
  };

  //!데이터 관련 오류 수정해야함
  const checkTodo = (id, input) => {
    const checkTodo = async () => {
      await api
        .put(`${TODO}/${id}`, { todo: input, isCompleted })
        .then((res) => {
          setTodos(
            todos.map((todo) => {
              if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
                console.log(todo.isCompleted);
              }
              return todo;
            })
          );
        });
    };
    checkTodo();
  };

  const deleteTodo = (id) => {
    const deleteTodo = async () => {
      await api
        .delete(`${TODO}/${id}`, {})
        .then((res) => {
          setTodos(todos.filter((todo) => todo.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    deleteTodo();
  };

  return (
    <Box sx={{ mt: 13 }}>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} />
    </Box>
  );
};

export default ToDo;
