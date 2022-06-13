import { Grid } from "@mui/material";
import React from "react";
import DiaryCard from "./DiaryCard";
import img from "../../imgs/testplant.png";
const DiaryTab = () => {
  const diaryTitle = {
    title: "1일 ❤️",
    content: "식물이름과 1일을 함께 했어요!",
  };
  const diaryList = [
    { title: "이미지 없는 글", content: "이미지 없는 글 테스트" },
    { title: "이미지 있는 글", img: img, content: "이미지 있는 글 테스트" },
    { title: "이미지 있는 글2", img: img, content: "이미지 있는 글 테스트2" },
  ];
  return (
    <Grid container rowSpacing={5}>
      <Grid item sx={{ mx: "auto" }}>
        <DiaryCard diary={diaryTitle} />
      </Grid>
      {diaryList.map((diary, i) => {
        return (
          <Grid item sx={{ mx: "auto" }} key={i}>
            <DiaryCard diary={diary} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DiaryTab;
