import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";

import MyGardenCardList from "./MyGardenCardList";
import { UserStateContext } from "../../App";

const MyGarden = () => {
  // 상태관리 및 user 정보
  const userState = useContext(UserStateContext);
  const userName = userState.user.name;

  return (
    <>
      <Grid container sx={{ px: 3 }} columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography component="span" fontWeight="bold" variant="h4">
            {userName}
          </Typography>
          <Typography component="span" variant="h5">
            님의 정원
          </Typography>
        </Grid>
        <MyGardenCardList />
      </Grid>
    </>
  );
};

export default MyGarden;
