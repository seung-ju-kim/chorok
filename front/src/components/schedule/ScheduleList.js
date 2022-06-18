import React, { useState } from "react";
import { List, Grid } from "@mui/material";
import ScheduleCard from "./ScheduleCard";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  return (
    <>
      <Grid item xs={12}>
        <List sx={{ width: "100%" }}>
          {schedules.map((schedule, i) => {
            return <ScheduleCard key={i} schedule={schedule} />;
          })}
        </List>
      </Grid>
    </>
  );
};

export default ScheduleList;
