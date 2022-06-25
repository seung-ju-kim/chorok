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
import * as Api from "../../api";
const CommunityCard = ({ board }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (board.category === "정보공유") {
      navigate(`/community/infoBoard/${board._id}`);
    } else {
      navigate(`/community/freeBoard/${board._id}`);
    }
  };

  return (
    <Card sx={{ mx: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          title={
            <Typography variant="h6" textAlign="center">
              {board.title}
            </Typography>
          }
        />
        <CardMedia component="img" image={board.imageURL} />
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
