import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import MyGardenCardList from "../components/mygarden/MyGardenCardList";

const MyGardenpage = () => {
  return (
    <Box sx={{ pt: 10, pb: 15, px: "5%" }}>
      <Typography fontWeight="bold" fontSize="7vw" sx={{ mb: 3 }}>
        나의 정원
      </Typography>
      <Grid container rowSpacing={6} columnSpacing={3}>
        <MyGardenCardList />
      </Grid>
    </Box>
  );
};

export default MyGardenpage;
