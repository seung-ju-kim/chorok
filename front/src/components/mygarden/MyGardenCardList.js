import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import MyGardenCard from "./MyGardenCard";
import MyGardenAddModal from "./MyGardenAddModal";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";

const MyGardenCardList = () => {
  // 나의 식물 상태관리
  const [myPlants, setMyPlants] = useState([]);
  const [openAddPlant, setOpenAddPlant] = useState(false);
  const navigate = useNavigate();

  // 나의 식물 리스트 받아오기
  useEffect(() => {
    Api.get("plants").then((res) => {
      setMyPlants(res.data.plants);
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
        <Typography variant="body2">
          현재 {myPlants.length}개의 식물을 키우고 있습니다.
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Button
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            color: "#64a68a",
            mx: "auto",
            display: "flex",
            height: "180px",
            width: "100%",
            maxWidth: "250px",
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
      </Grid>

      {myPlants.length ? (
        <>
          {myPlants.map((myplant, i) => {
            return (
              <Grid item xs={6}>
                <MyGardenCard key={i} myplant={myplant} />
              </Grid>
            );
          })}
        </>
      ) : (
        Array(5)
          .fill(0)
          .map((e) => {
            return (
              <Grid item xs={6}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={150}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={30}
                />
              </Grid>
            );
          })
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
