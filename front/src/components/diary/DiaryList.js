import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";

import DiaryCard from "./DiaryCard";
import DiaryAddModal from "./DiaryAddModal";
import * as Api from "../../api";

const DiaryList = () => {
  // 다이어리 상태 관리
  const [openWriteForm, setOpenWriteForm] = useState(false);
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // useParams
  const { id } = useParams();

  // 다이어리 불러오기
  useEffect(() => {
    Api.get(`diaries?plantId=${id}`).then((res) => {
      setDiaries(res.data.diaries);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={3} sx={{ my: 7 }}>
        <Button
          fullWidth
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            color: "#64a68a",
            width: "100%",
            py: 4,
          }}
          onClick={() => {
            setOpenWriteForm(true);
          }}
        >
          <EditIcon sx={{ mr: 2 }} />
          <Typography>오늘 식물과 어떤 일이 있었나요?</Typography>
        </Button>

        {!isLoading ? (
          <>
            {diaries.map((diary, i) => {
              return (
                <Grid item xs={12} sm={6} lg={4} key={i}>
                  <DiaryCard
                    setDiaries={setDiaries}
                    isLoading={isLoading}
                    diary={diary}
                  />
                </Grid>
              );
            })}
          </>
        ) : (
          Array(10)
            .fill(0)
            .map((e, i) => {
              return (
                <Grid item xs={12} sm={6} lg={4} key={i}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={300}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="50%"
                    height={30}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="80%"
                    height={30}
                  />
                </Grid>
              );
            })
        )}

        <DiaryAddModal
          openWriteForm={openWriteForm}
          setOpenWriteForm={setOpenWriteForm}
          setDiaries={setDiaries}
        />
      </Grid>
    </>
  );
};

export default DiaryList;
