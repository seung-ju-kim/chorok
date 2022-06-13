import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const DiaryCard = ({ diary }) => {
  return (
    <Card
      sx={{
        width: "80vw",
        boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
      }}
    >
      {diary.img && (
        <CardMedia
          component="img"
          height="100%"
          image={diary.img}
          alt="diary img"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4">
          {diary.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {diary.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
