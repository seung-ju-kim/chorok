import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import MyGardenCardList from "../components/mygarden/MyGardenCardList";

const MyGardenpage = () => {
  return (
    <Box sx={{ my: 10, px: 3 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography fontWeight="bold" fontSize="7vw">
            나의 정원
          </Typography>
        </Grid>
        <MyGardenCardList />
      </Grid>
    </Box>
  );
};

export default MyGardenpage;
