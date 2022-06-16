import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const DiaryCard = ({ diary }) => {
  // style
  const cardStyle = {
    width: "90vw",
    border: "1px solid white",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  };
  return (
    <Card sx={cardStyle}>
      {diary.img && (
        <CardMedia
          component="img"
          image={diary.img}
          alt="diary img"
          sx={{ p: 2, height: "30vh" }}
        />
      )}
      <CardContent sx={{ position: "relative" }}>
        <MoreVertOutlinedIcon sx={{ position: "absolute", right: 10 }} />
        <Typography gutterBottom variant="h5">
          {diary.title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {diary.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
