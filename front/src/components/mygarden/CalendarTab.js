import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";

const CalendarTab = () => {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };

  return (
    <Box sx={{ height: "100%", pt: 3 }}>
      <Calendar value={dateState} onChange={changeDate} />
      <p>
        Current selected date is{" "}
        <b>{moment(dateState).format("MMMM Do YYYY")}</b>
      </p>
    </Box>
  );
};

export default CalendarTab;
