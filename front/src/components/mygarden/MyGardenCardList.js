import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Typography, Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import MyGardenCard from "./MyGardenCard";
import MyGardenAddModal from "./MyGardenAddModal";
import * as Api from "../../api";

const MyGardenCardList = ({ initMyPlants = [] }) => {
  // 나의 식물 상태관리
  const [myPlants, setMyPlants] = useState(initMyPlants);
  const [openAddPlant, setOpenAddPlant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // 나의 식물 리스트 받아오기
  useEffect(() => {
    Api.get("plants").then((res) => {
      setMyPlants(res.data.plants);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="success"
        sx={{ position: "absolute", right: 20, top: 100 }}
        startIcon={<CalendarMonthOutlinedIcon />}
        onClick={() => {
          navigate("/mygarden/myschedule");
        }}
      >
        스케줄
      </Button>

      <Grid item xs={12} sx={{ my: "auto" }}>
        {isLoading ? (
          <Skeleton variant="text" width="60%" />
        ) : (
          <Typography variant="body2">
            현재 {myPlants.length}개의 식물을 키우고 있습니다.
          </Typography>
        )}
      </Grid>

      <Grid item xs={6} sm={4} md={3} lg={2}>
        <Card
          sx={{
            minWidth: "150px",
            height: "180px",
            mx: "auto",
          }}
        >
          <Button
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              color: "#64a68a",
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setOpenAddPlant(true);
            }}
          >
            <AddIcon />
          </Button>
        </Card>
      </Grid>
      {isLoading ? (
        Array(20)
          .fill(1)
          .map((e, i) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                <Skeleton variant="rectangular" height={180} />
              </Grid>
            );
          })
      ) : (
        <>
          {myPlants.map((myplant, i) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                <MyGardenCard myplant={myplant} />
              </Grid>
            );
          })}
        </>
      )}

      <MyGardenAddModal
        openAddPlant={openAddPlant}
        setOpenAddPlant={setOpenAddPlant}
        setMyPlants={setMyPlants}
      />
    </>
  );
};

export default MyGardenCardList;
