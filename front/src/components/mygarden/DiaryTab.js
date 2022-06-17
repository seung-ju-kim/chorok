import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DiaryCard from "./DiaryCard";
import DiaryAddModal from "./DiaryAddModal";

const DiaryTab = () => {
  const [openWriteForm, setOpenWriteForm] = useState(false);
  const [diaries, setDiaries] = useState([]);

  // style
  const writeButtonStyle = {
    position: "fixed",
    right: "5%",
    bottom: "15%",
    fontSize: "3rem",
    color: "#64a68a",
    borderRadius: "50%",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
    bgcolor: "white",
    p: 1,
    cursor: "pointer",
  };

  return (
    <Grid container rowSpacing={3}>
      {diaries.map((diary, i) => {
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
