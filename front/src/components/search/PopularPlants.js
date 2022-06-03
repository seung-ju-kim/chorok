import React from "react";
import { Grid, Typography, Box } from "@mui/material";
function PopularPlants() {
  return (
    <Grid container fluid sx={{ my: 3 }}>
      <Grid item xs={10} sx={{ mb: 2, mx: "auto" }}>
        <Typography variant="h6">요즘 핫한 식물 순위</Typography>
      </Grid>
      <Grid
        item
        xs={10}
        sx={{ bgcolor: "lightgreen", height: "30vh", mx: "auto" }}
      >
        차트 들어갈 예정
      </Grid>
    </Grid>
  );
}

export default PopularPlants;
