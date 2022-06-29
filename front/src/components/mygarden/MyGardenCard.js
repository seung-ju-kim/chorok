import React from "react";
import { Card, CardMedia, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        mx: "auto",
        minWidth: "150px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={myplant.imageURL}
          sx={{ objectFit: "fill", height: "150px" }}
          onClick={() => {
            navigate(`/mygarden/${myplant._id}`);
          }}
        />

        <Typography textAlign="center" sx={{ p: 0.5 }}>
          {myplant.nickname}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default MyGardenCard;
