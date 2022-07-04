import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  CardActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import * as Api from "../../api";

const MyScheduleCard = ({ myPlant, setMyPlants, getList }) => {
  const navigate = useNavigate();

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 물주기
  const watering = async () => {
    try {
      await Api.post(`plants/${myPlant.plantId}/${myPlant._id}`, {
        isChecked: true,
      });
      await getList();
      styleSnackbar("식물에 물을 주셨습니다.", "success");
    } catch (e) {
      styleSnackbar(e.response.data, "error");
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "700px",
        mx: "auto",
      }}
    >
      <CardContent
        sx={{ cursor: "pointer", width: "100%" }}
        onClick={() => {
          navigate(`/mygarden/${myPlant.plantId}`);
        }}
      >
        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {myPlant.nickname}{" "}
          </Typography>
          물 주는 날입니다.
        </Typography>
        <Typography variant="subtitle1">{myPlant.species}</Typography>
        <Typography variant="subtitle1">
          {myPlant.date.split("T")[0]}
        </Typography>
      </CardContent>

      <CardActions>
        {!myPlant.isChecked &&
          myPlant.date.split("T")[0] === dayjs().format("YYYY-MM-DD") && (
            <Button onClick={watering} color="success">
              물주기
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default MyScheduleCard;
