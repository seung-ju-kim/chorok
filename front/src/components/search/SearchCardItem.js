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

function SearchCardItem() {
  // const [myPlants, setMyPlants] = useState([]);
  // useEffect(async () => {
  //   await Api.get("/").then((res) => setMyPlants(res.data));
  // }, []);
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={test} alt="test" />
        <CardContent>
          <Typography
            textAlign="center"
            gutterBottom
            variant="h6"
            component="div"
          >
            고무나무
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SearchCardItem;
