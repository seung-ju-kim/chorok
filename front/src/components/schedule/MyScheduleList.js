import React from "react";
import { Box, Typography } from "@mui/material";
import MyScheduleCard from "./MyScheduleCard";

const MyScheduleList = () => {
  return (
    <Box sx={{ py: 12, px: "5%" }}>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ mb: 3 }}
      >
        나의 스케줄
      </Typography>
      <MyScheduleCard />
    </Box>
  );
};

export default MyScheduleList;
