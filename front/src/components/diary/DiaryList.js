import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

import DiaryCard from "./DiaryCard";
import DiaryAddModal from "./DiaryAddModal";
import * as Api from "../../api";

const DiaryList = () => {
  // 다이어리 상태 관리
  const [openWriteForm, setOpenWriteForm] = useState(false);
  const [diaries, setDiaries] = useState([]);

  // useParams, useNavigate
  const { id } = useParams();

  // 다이어리 불러오기
  useEffect(() => {
    Api.get(`diaries?plantId=${id}`).then((res) => {
      setDiaries(res.data.diaries);
      console.log(res.data.diaries);
    });
  }, [id]);

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
            <DiaryCard setDiaries={setDiaries} diary={diary} />
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
        setDiaries={setDiaries}
      />
    </Grid>
  );
};

export default DiaryList;
