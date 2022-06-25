import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "25vh",
        mx: "auto",
        minWidth: "150px",
      }}
    >
      <CardMedia
        component="img"
        image={myplant.imageURL}
        sx={{ objectFit: "fill", height: "20vh" }}
        onClick={() => {
          navigate(`/mygarden/${myplant._id}`);
        }}
      />
      <Typography variant="h6" textAlign="center">
        {myplant.nickname}
      </Typography>
    </Card>
  );
};

export default MyGardenCard;
