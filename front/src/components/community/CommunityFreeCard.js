import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommunityFreeCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6}>
      <Box
        component="img"
        src={data.img}
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/community/${data.id}`);
        }}
      />
    </Grid>
  );
};
  
export default CommunityFreeCard;