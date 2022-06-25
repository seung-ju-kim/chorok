import {
  Typography,
  CardActions,
  Button,
  Card,
  Box,
  CardContent,
} from "@mui/material";
import React from "react";
import * as Api from "../../api";
const MyScheduleCard = ({ myPlant, setMyPlants }) => {
  const watering = async () => {
    await Api.post(`plants/${myPlant.plantId}/${myPlant._id}`, {
      isChecked: true,
    });
    await Api.get("schedules").then((res) => {
      setMyPlants(res.data);
    });
  };
  return (
    <Card>
      <CardContent>
        <Typography>
          오늘은{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {myPlant.nickname}
          </Typography>{" "}
          물 주는 날입니다.
        </Typography>
      </CardContent>
      <CardActions>
        {!myPlant.isChecked ? (
          <Button onClick={watering}>물주기</Button>
        ) : (
          <Typography>물주기 완료</Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default MyScheduleCard;
