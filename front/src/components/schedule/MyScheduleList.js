import React, { useEffect, useState } from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import MyScheduleCard from "./MyScheduleCard";
import * as Api from "../../api";
import dayjs from "dayjs";

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

      {myPlants.map((myPlant, i) => {
        return (
          <Box key={i}>
            {today === myPlant.date.split("T")[0] && (
              <MyScheduleCard setMyPlants={setMyPlants} myPlant={myPlant} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default MyScheduleList;
