import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  CardContent,
  Typography,
} from "@mui/material";

import MyScheduleCard from "./MyScheduleCard";
import * as Api from "../../api";

const MyScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [pendingschedules, setPendingSchedules] = useState([]);

  const [alignment, setAlignment] = useState("today");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    getSchedule();
    getPendingSchedule();
  }, [alignment]);

  // 스케줄 목록 받아오기
  const getSchedule = async () => {
    const res = await Api.get("schedules");
    setSchedules(res.data);
  };

  // 스케줄 목록 받아오기
  const getPendingSchedule = async () => {
    const res = await Api.get("pendingschedules");
    setPendingSchedules(res.data);
  };

  return (
    <Box sx={{ py: 12, px: "5%" }}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{
          mb: 3,
          ".MuiToggleButtonGroup-grouped": {
            border: 0,
          },
        }}
      >
        <ToggleButton value="today" aria-label="left aligned">
          오늘
        </ToggleButton>
        <ToggleButton value="scheduled" aria-label="centered">
          예정
        </ToggleButton>
      </ToggleButtonGroup>
      {alignment === "today" ? (
        <>
          <Grid container spacing={2}>
            {schedules.length === 0 ? (
              <Grid item xs={12}>
                <Card sx={{ maxWidth: "700px", mx: "auto" }}>
                  <CardContent sx={{ m: 5 }}>
                    <Typography textAlign="center">
                      오늘 예정된 스케줄이 없습니다.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              schedules.map((myPlant, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <MyScheduleCard
                      setMyPlants={setSchedules}
                      myPlant={myPlant}
                      getList={getSchedule}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {pendingschedules.length === 0 ? (
              <Grid item xs={12}>
                <Card sx={{ maxWidth: "700px", mx: "auto" }}>
                  <CardContent sx={{ m: 5 }}>
                    <Typography textAlign="center">
                      예정된 스케줄이 없습니다.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              pendingschedules.map((myPlant, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <MyScheduleCard
                      setMyPlants={setPendingSchedules}
                      myPlant={myPlant}
                      getList={getPendingSchedule}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default MyScheduleList;
