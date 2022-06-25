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
      <Grid container rowSpacing={3} sx={{ my: 5 }}>
        <Grid item xs={12}>
          <Button
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
        </Grid>
        {!isLoading ? (
          <>
            {diaries.map((diary, i) => {
              return (
                <Grid item sx={{ mx: "auto" }} key={i}>
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
          Array(5)
            .fill(0)
            .map((e, i) => {
              return (
                <Grid item xs={12} key={i}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={150}
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
