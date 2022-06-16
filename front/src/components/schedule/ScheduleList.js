import React from "react";
import { List, Grid } from "@mui/material";
import ScheduleCard from "./ScheduleCard";

const list = [
  { title: "쑥쑥이", content: "금전수" },
  { title: "다육이", content: "스킨답서스" },
  { title: "고무나무", content: "고무나무" },
];

const ScheduleList = () => {
  return (
    <Grid item xs={12}>
      <List sx={{ width: "100%" }}>
        {list.map((data) => {
          return <ScheduleCard data={data}></ScheduleCard>;
        })}
      </List>
    </Grid>
  );
};

export default ScheduleList;
