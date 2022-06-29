import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

import MyScheduleCard from "./MyScheduleCard";
import * as Api from "../../api";

const MyScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [fulfillschedules, setFullfillSchedules] = useState([]);
  const [pendingschedules, setPendingSchedules] = useState([]);

  useEffect(() => {
    getSchedule();
    getFulfillSchedule();
    getPendingSchedule();
  }, []);

  // 스케줄 목록 받아오기
  const getSchedule = async () => {
    const res = await Api.get("schedules");
    setSchedules(res.data);
  };
  // 스케줄 목록 받아오기
  const getFulfillSchedule = async () => {
    const res = await Api.get("fulfillschedules");
    setFullfillSchedules(res.data);
  };
  // 스케줄 목록 받아오기
  const getPendingSchedule = async () => {
    const res = await Api.get("pendingschedules");
    setPendingSchedules(res.data);
  };

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
        {schedules.map((myPlant, i) => {
          return (
            <Grid item xs={12} key={i}>
              <MyScheduleCard setMyPlants={setSchedules} myPlant={myPlant} />
            </Grid>
          );
        })}
      </Grid>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ my: 3 }}
      >
        완료한 스케줄
      </Typography>
      <Grid container spacing={2}>
        {fulfillschedules.map((myPlant, i) => {
          return (
            <Grid item xs={12} key={i}>
              <MyScheduleCard
                setMyPlants={setFullfillSchedules}
                myPlant={myPlant}
              />
            </Grid>
          );
        })}
      </Grid>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ my: 3 }}
      >
        예정된 스케줄
      </Typography>
      <Grid container spacing={2}>
        {pendingschedules.map((myPlant, i) => {
          return (
            <Grid item xs={12} key={i}>
              <MyScheduleCard
                setMyPlants={setPendingSchedules}
                myPlant={myPlant}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyScheduleList;
