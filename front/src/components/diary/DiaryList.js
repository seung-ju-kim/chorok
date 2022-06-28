import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Skeleton, Box } from "@mui/material";
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
  useEffect(() => {
    getDiary();
  }, [id]);

  // 다이어리 불러오기
  const getDiary = async () => {
    const res = await Api.get(`diaries?plantId=${id}`);
    setDiaries(res.data.diaries);
    setIsLoading(false);
  };

  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={3} sx={{ my: 7, px: 5 }}>
        <Grid item xs={12}>
          <Box sx={{ mx: "auto", maxWidth: "800px" }}>
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
          </Box>
        </Grid>
        {!isLoading ? (
          <>
            {diaries.map((diary, i) => {
              return (
                <Grid item xs={12} key={i}>
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
