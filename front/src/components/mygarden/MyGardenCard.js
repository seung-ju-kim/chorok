import React from "react";
import { Card, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid item xs={6}>
        <Card
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            cursor: "pointer",
            maxWidth: "250px",
            mx: "auto",
          }}
        >
          <CardMedia
            component="img"
            image={myplant.imageURL}
            sx={{ objectFit: "fill", height: "150px" }}
            onClick={() => {
              navigate(`/mygarden/${myplant._id}`);
            }}
          />

          <Typography variant="h6" textAlign="center">
            {myplant.nickname}
          </Typography>
        </Card>
      </Grid>
    </>
  );
};

export default MyGardenCard;
