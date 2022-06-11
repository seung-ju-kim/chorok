import React from "react";
import { Box, Typography, Grid } from "@mui/material";
const MyGardenCard = ({ data }) => {
  return (
    <Grid item xs={6}>
      <Box
        component="img"
        src={data.img}
        sx={{
          width: "100%",
          height: "80%",
          borderRadius: "10px",
          boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
        }}
      />
      <Typography textAlign="center">{data.name}</Typography>
    </Grid>
  );
};

export default MyGardenCard;
