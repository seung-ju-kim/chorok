import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const DiaryCard = ({ diary }) => {
  // style
  const cardStyle = {
    width: "80vw",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
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
      <CardContent>
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
