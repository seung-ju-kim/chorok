import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ScheduleList from "../components/schedule/ScheduleList";

function Schedulepage() {
  return (
    <Box sx={{ my: 12, px: "5%" }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography fontWeight="bold" fontSize="7vw">
            가드닝 스케줄
          </Typography>
        </Grid>
        <ScheduleList />
      </Grid>
    </Box>
  );
}

export default Schedulepage;
