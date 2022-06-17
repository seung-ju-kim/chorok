import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ScheduleList from "../components/schedule/ScheduleList";

function Schedulepage() {
  return (
    <Box sx={{ pt: 12, pb: 15, px: "5%" }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography fontFamily="CookieRun-Regular" fontSize="1.5rem">
            오늘의 스케줄
          </Typography>
        </Grid>
        <ScheduleList />
      </Grid>
    </Box>
  );
}

export default Schedulepage;
