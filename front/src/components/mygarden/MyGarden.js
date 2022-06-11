import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import MyGardenCardList from "./MyGardenCardList";
import { UserStateContext } from "../../App";
const MyGarden = () => {
  const userState = useContext(UserStateContext);
  const userName = userState.user.name;
  return (
    <Grid container sx={{ mt: 10, px: 3 }} spacing={2}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography component="span" fontWeight="bold" variant="h6">
          {userName}
        </Typography>
        <Typography component="span" variant="h6">
          님의 정원
        </Typography>
      </Grid>
      <MyGardenCardList />
    </Grid>
  );
};

export default MyGarden;
