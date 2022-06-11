import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Box, Button } from "@mui/material";

function ToDos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const wrapper = {
    mt: 12,
  };

  const api = axios.create({
    baseURL: "http://localhost:3003",
  });

  const TODO = "/todos";

  async function getTodos() {
    await api
      .get(TODO)
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await api
        .post(TODO, { todo: input, completed: false })
        .then((res) => {
          console.log(res.data);
          setInput(""); // 입력칸 초기화
          getTodos(); // 추가한 데이터 다시 받아옴
        })
        .catch((err) => console.error(err));
    };
    insertTodo();
    console.log("할일이 추가됨!");
  }

  /* 구현 중 ..
  function updateTodo(id) {
    const updateTodo = async () => {
      await api
        .put(`${TODO}/${id}`, {})
        .then((res) => {
          console.log(res.data);
          getTodos(); // 추가한 데이터 다시 받아옴
        })
        .catch((err) => console.error(err));
    };
    updateTodo();
  }
  */

  function deleteTodo(id) {
    console.log(id);
    const deleteTodo = async () => {
      await api
        .delete(`${TODO}/${id}`, {})
        .then((res) => {
          setTodos(todos.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    deleteTodo();
  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box component="section">
      <Box component="form" onSubmit={insertTodo} sx={wrapper}>
        <TextField
          label="입력칸"
          variant="standard"
          value={input}
          onChange={changeText}
        />
        <Button type="submit" variant="contained">
          버튼
        </Button>
      </Box>

      {todos
        ? todos.map((item) => {
            return (
              // 빈 함수로 updateTodo를 실행되게 만듦
              <Box key={item.id}>
                <Box>
                  {/* <label
                  className={item.completed ? "completed" : null}
                  onClick={() => updateTodo(item.id)}
                >
                  {item.item}
                </label> */}

                  {item.todo}
                  <label onClick={() => deleteTodo(item.id)}>❌</label>
                </Box>
              </Box>
            );
          })
        : null}
    </Box>
  );
}

export default ToDos;
