import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  Button,
  Skeleton,
  Box,
  CardActionArea,
} from "@mui/material";
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

  useEffect(() => {
    getMyPlant();
  }, []);

  // 나의 식물 리스트 받아오기
  const getMyPlant = async () => {
    const res = await Api.get("plants");
    setMyPlants(res.data.plants);
    setIsLoading(false);
  };

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
          <Skeleton animation="wave" variant="text" width="60%" />
        ) : (
          <Typography variant="body2">
            현재 {myPlants.length}개의 식물을 키우고 있습니다.
          </Typography>
        )}
      </Grid>

      <Grid item xs={6} md={3} lg={2}>
        <Card>
          <CardActionArea sx={{ py: 2 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                pb: "100%",
                overflow: "hidden",
              }}
            >
              <AddIcon
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  color: "#64a68a",
                  p: 7,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenAddPlant(true);
                }}
              />
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
      {isLoading ? (
        Array(20)
          .fill(1)
          .map((e, i) => {
            return (
              <Grid item xs={6} md={3} lg={2} key={i}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    pb: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                      objectFit: "cover",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="15%"
                />
              </Grid>
            );
          })
      ) : (
        <>
          {myPlants.map((myplant, i) => {
            return (
              <Grid item xs={6} md={3} lg={2} key={i}>
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
