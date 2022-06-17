import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const ScheduleCard = ({ data }) => {
  return (
    <ListItem
      sx={{
        mb: 2,
        height: "10vh",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <ListItemText primary={data.title} secondary={data.content} />
    </ListItem>
  );
};

export default ScheduleCard;
