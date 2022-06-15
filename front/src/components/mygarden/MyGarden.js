import React from "react";
import { Grid, Typography } from "@mui/material";

import MyGardenCardList from "./MyGardenCardList";

const MyGarden = () => {
  return (
    <>
      <Grid container sx={{ px: 3 }} columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5, ml: "5%" }}>
          <Typography fontWeight="bold" fontSize="7vw">
            나의 정원
          </Typography>
        </Grid>
        <MyGardenCardList />
      </Grid>
    </>
  );
};

export default MyGarden;
