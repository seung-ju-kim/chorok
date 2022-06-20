import React from "react";
import {
  Card,
  CardMedia,
  Skeleton,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyGardenCard = ({ myplant }) => {
  const navigate = useNavigate();

  return (
    <>
      {myplant ? (
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
              height="150"
              sx={{ objectFit: "fill" }}
              onClick={() => {
                navigate(`/mygarden/${myplant._id}`);
              }}
            />

            <Typography variant="h6" textAlign="center">
              {myplant.nickname}
            </Typography>
          </Card>
        </Grid>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="text" />
        </Stack>
      )}
    </>
  );
};

export default MyGardenCard;
