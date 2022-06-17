import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import MyGardenCardList from "../components/mygarden/MyGardenCardList";

const MyGardenpage = () => {
  return (
    <Box sx={{ py: 12, px: "5%" }}>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ mb: 5 }}
      >
        나의 정원
      </Typography>
      <Grid container rowSpacing={5} columnSpacing={3}>
        <MyGardenCardList />
      </Grid>
    </Box>
  );
};

export default MyGardenpage;
