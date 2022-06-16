import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import * as Api from "../../api";
import TodoList from "./TodoList";
import DiagImg from "./DiagImg";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [openDiagPlant, setOpenDiagPlant] = useState(false);

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
    <>
      <Grid container sx={{ mb: 5 }}>
        <Grid item xs={12}>
          <Typography sx={{ mb: 3 }} fontWeight="bold" fontSize="5vw">
            물주기 스케쥴
          </Typography>
        </Grid>
        <TodoList />
        <Box
          onClick={() => {
            setOpenDiagPlant(true);
          }}
        >
          <Typography>진단식물 등록하기</Typography>
        </Box>
      </Grid>
      <DiagImg
        openDiagPlant={openDiagPlant}
        setOpenDiagPlant={setOpenDiagPlant}
      />
    </>
  );
};

export default TodoForm;

/*
<Grid container sx={{ px: 3 }} columnSpacing={2}>
<Grid item xs={12} sx={{ mb: 5, ml: "5%" }}>
  <Typography fontWeight="bold" fontSize="7vw">
    나의 정원
  </Typography>
</Grid>
<MyGardenCardList />
</Grid>
*/
