import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const ScheduleCard = ({ data }) => {
  return (
    <ListItem
      sx={{
        mb: 2,
        height: "10vh",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <ListItemText primary={data.title} secondary={data.content} />
    </ListItem>
  );
};

export default ScheduleCard;
