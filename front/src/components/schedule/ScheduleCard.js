import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const ScheduleCard = ({ data }) => {
  return (
    <ListItem
      sx={{
        mb: 2,
        borderRadius: "10px",
        height: "10vh",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <ListItemText primary={data.title} secondary={data.content} />
    </ListItem>
  );
};

export default ScheduleCard;
