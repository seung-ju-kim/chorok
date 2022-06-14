import React from "react";
import { List } from "@mui/material";
import ToDoCard from "./ToDoCard";

const list = [
  { content: "1" },
  { content: "2" },
  { content: "3" },
  { content: "4" },
  { content: "1" },
  { content: "2" },
  { content: "3" },
  { content: "4" },
  { content: "1" },
  { content: "2" },
  { content: "3" },
  { content: "4" },
];

const TodoList = () => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {list.map((data) => {
        return <ToDoCard data={data}></ToDoCard>;
      })}
    </List>
  );
};

export default TodoList;
