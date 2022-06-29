import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import MyScheduleCard from "./MyScheduleCard";
import * as Api from "../../api";
import dayjs from "dayjs";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
const MyScheduleList = () => {
  const [myPlants, setMyPlants] = useState([]);
  const today = dayjs().format("YYYY-MM-DD");

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
