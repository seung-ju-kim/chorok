import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

import MyScheduleCard from "./MyScheduleCard";
import * as Api from "../../api";

const MyScheduleList = () => {
  const [myPlants, setMyPlants] = useState([]);
  const today = dayjs().format("YYYY-MM-DD");

  // 스케줄 목록 받아오기
  useEffect(() => {
    Api.get("schedules").then((res) => {
      setMyPlants(res.data);
    });
  }, []);

  return (
    <Box sx={{ py: 12, px: "5%" }}>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ mb: 3 }}
      >
        오늘의 스케줄
      </Typography>
      <Grid container spacing={2}>
        {myPlants.map((myPlant, i) => {
          return (
            <Grid item xs={12} key={i}>
              {today === myPlant.date.split("T")[0] && (
                <MyScheduleCard setMyPlants={setMyPlants} myPlant={myPlant} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyScheduleList;
