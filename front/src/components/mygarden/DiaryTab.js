import React, { useState } from "react";
import { Grid } from "@mui/material";

import DiaryCard from "./DiaryCard";
import img from "../../imgs/testplant.png";
import EditIcon from "@mui/icons-material/Edit";
import DiaryAddModal from "./DiaryAddModal";

const DiaryTab = () => {
  const [openWriteForm, setOpenWriteForm] = useState(false);
  const diaryTitle = {
    title: "1일 ❤️",
    content: "식물이름과 1일을 함께 했어요!",
  };
  const diaryList = [
    { title: "이미지 없는 글", content: "이미지 없는 글 테스트" },
    { title: "이미지 있는 글", img: img, content: "이미지 있는 글 테스트" },
    { title: "이미지 있는 글2", img: img, content: "이미지 있는 글 테스트2" },
  ];
  // style
  const writeButtonStyle = {
    position: "fixed",
    right: "5%",
    bottom: "15%",
    fontSize: "5rem",
    color: "#64a68a",
    borderRadius: "50%",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
    bgcolor: "white",
    p: 2,
    cursor: "pointer",
  };
  return (
    <Grid container rowSpacing={3}>
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
      <EditIcon
        sx={writeButtonStyle}
        onClick={() => {
          setOpenWriteForm(true);
        }}
      />
      <DiaryAddModal
        openWriteForm={openWriteForm}
        setOpenWriteForm={setOpenWriteForm}
      />
    </Grid>
  );
};

export default DiaryTab;
