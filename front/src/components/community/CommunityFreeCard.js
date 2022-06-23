import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommunityFreeCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        component="img"
        src={data.img}
        sx={{
          width: "100%",
          height: "80%",
          borderRadius: "10px",
          boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/community/${data.id}`);
        }}
      />
      <Typography textAlign="center">{data.name}</Typography>
    </Container>
  );
};

export default CommunityFreeCard;
