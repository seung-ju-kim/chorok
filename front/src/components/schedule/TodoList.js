import React from "react";
import { List } from "@mui/material";
import ToDoCard from "./ToDoCard";
import DiagImg from "./DiagImg";

const list = [{ content: "1" }];

const TodoList = () => {
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {list.map((data) => {
          return <ToDoCard data={data}></ToDoCard>;
        })}
      </List>
      <hr />
      <DiagImg />
    </>
  );
};

export default TodoList;
