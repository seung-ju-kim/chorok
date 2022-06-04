import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import test from "../../imgs/testplant.png";
import * as Api from "../../api.js";
import { useNavigate } from "react-router-dom";

function SearchCardItem({ card }) {
  const navigate = useNavigate();
  // const [myPlants, setMyPlants] = useState([]);
  // useEffect(async () => {
  //   await Api.get("/").then((res) => setMyPlants(res.data));
  // }, []);
  return (
    <Card
      onClick={() => navigate(`/search/${card.name}`)}
      sx={{ cursor: "pointer" }}
    >
      <CardMedia component="img" image={test} alt="test" />
      <CardContent>
        <Typography textAlign="center" variant="h6" component="div">
          {card.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SearchCardItem;
