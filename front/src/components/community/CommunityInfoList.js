import React from "react";
import { Grid, Typography } from "@mui/material";

const CommunityInfoList = () => {
    return (
      <>
          <Grid container sx={{ px: 3 }} columnSpacing={1} justifyContent="center">
            <Typography fontWeight="bold" fontSize="7vw" >
              정보공유 게시판
            </Typography>
            <Grid>
              
            </Grid>
          </Grid>
      </>
    )
  }

export default CommunityInfoList;