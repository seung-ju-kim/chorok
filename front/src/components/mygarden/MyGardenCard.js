import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            pb: "100%",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={myplant.imageURL}
            sx={{
              objectFit: "cover",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onClick={() => {
              navigate(`/mygarden/${myplant._id}`);
            }}
          />
        </Box>
        <Typography textAlign="center" sx={{ py: 0.5 }}>
          {myplant.nickname}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default MyGardenCard;
