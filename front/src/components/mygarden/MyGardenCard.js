import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6}>
      <Box
        component="img"
        src={data.img}
        sx={{
          width: "100%",
          height: "80%",
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/mygarden/${data.id}`);
        }}
      />
      <Typography textAlign="center">{data.name}</Typography>
    </Grid>
  );
};

export default MyGardenCard;
