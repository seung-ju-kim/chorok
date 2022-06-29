import React, { useState } from "react";
import { Box } from "@mui/material";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const CalendarTab = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Box sx={{ my: 10 }}>
      {/* <Calendar onChange={onChange} value={value} /> */}
    </Box>
  );
};

export default CalendarTab;
