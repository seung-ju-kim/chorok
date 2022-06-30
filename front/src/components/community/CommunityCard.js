import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardActionArea,
  CardContent,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import defaultImage from "../../imgs/default_image.jpg";

const CommunityCard = ({ board }) => {
  const navigate = useNavigate();

  // 카테고리에 따라 url 변경
  const handleClick = () => {
    if (board.category === "정보공유") {
      navigate(`/community/infoBoard/${board._id}`);
    } else {
      navigate(`/community/freeBoard/${board._id}`);
    }
  };

  return (
    <Card sx={{ height: "400px", mx: "auto", minWidth: "300px" }}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          title={<Typography textAlign="center">{board.title}</Typography>}
          sx={{ height: "50px" }}
        />
        {board.imageURL ? (
          <CardMedia
            component="img"
            image={board.imageURL}
            sx={{ objectFit: "contain", height: "300px" }}
          />
        ) : (
          <CardMedia
            component="img"
            image={defaultImage}
            sx={{ objectFit: "contain", height: "300px" }}
          />
        )}

        <CardContent sx={{ px: 2 }}>
          <Typography component="span" variant="body2">
            {board.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CommunityCard;
