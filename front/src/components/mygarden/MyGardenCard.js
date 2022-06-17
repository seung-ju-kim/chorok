import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6}>
      <Box
        component="img"
        src={myplant.imageURL}
        sx={{
          width: "100%",
          height: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/mygarden/${myplant._id}`);
        }}
      />
      <Typography variant="h5" textAlign="center">
        {myplant.nickname}
      </Typography>
    </Grid>
  );
};

export default MyGardenCard;
