import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, Container, TextField, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const Wrapper = styled("section")`
    margin-top: 12%;
  `;

  const TopBar = styled("div")`
    margin: 0 20px;
    font-weight: bold;
    font-size: x-large;
  `;

  const UnderLine = styled("div")`
    border-bottom: 1px solid #e0e0e0;
    margin: 10px 0;
  `;

  const Content = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `;

  const TaskCard = styled("div")`
    background-color: #e0e0e0;
    border-radius: 6px;
    margin: 20px 0;
    text-align: left;
    font-size: 22px;
    position: relative;
  `;

  const TaskText = styled("span")`
    text-decoration: line-through;
    opacity: 0.3;
    flex: 1;
  `;

  const IconsWrap = styled("div")`
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: auto;
    display: inline-block;
  `;

  const Icons = styled("div")`
    margin: 0px 10px 0 10px;
    cursor: pointer;
  `;

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
    <Wrapper>
      <TopBar>오늘의 할일</TopBar>
      <UnderLine />
      <Container maxWidth="sm">
        <form>
          <FormControl fullWidth={true}>
            <TextField variant="standard" label="I will do this" />
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

      <Content>
        <Box component="form" onSubmit={insertTodo}>
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

        <Box>
          {todos
            ? todos.map((item) => {
                return (
                  // 빈 함수로 updateTodo를 실행되게 만듦
                  <TaskCard key={item.id}>
                    <Box>
                      {/* <label
                      className={item.completed ? "completed" : null}
                      onClick={() => updateTodo(item.id)}
                    >
                      {item.item}
                    </label> */}
                      <Box>{item.todo}</Box>
                      <IconsWrap onClick={() => deleteTodo(item.id)}>
                        <Icons> ❌ </Icons>
                      </IconsWrap>
                    </Box>
                  </TaskCard>
                );
              })
            : null}
        </Box>
      </Content>
    </Wrapper>
  );
}

export default ToDo;
