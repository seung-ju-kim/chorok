import React from "react";
import { Grid, Typography, Box } from "@mui/material";
function PopularPlants() {
  return (
    <Grid container sx={{ my: 3, px: 3 }}>
      <Grid item xs={10} sx={{ mb: 2 }}>
        <Typography fontWeight="bold" variant="h6">
          요즘 핫한 식물 순위
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ bgcolor: "green", height: "20vh" }}>
        차트 들어갈 예정
      </Grid>
    </Grid>
  );
}

export default PopularPlants;
