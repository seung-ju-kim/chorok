import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import MyGardenCardList from "../components/mygarden/MyGardenCardList";

const MyGardenpage = () => {
  return (
    <Box sx={{ pt: 12, pb: 15, px: "5%" }}>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ mb: 3 }}
      >
        나의 정원
      </Typography>

      <Grid container spacing={2}>
        <MyGardenCardList />
      </Grid>
    </Box>
  );
};

export default MyGardenpage;
