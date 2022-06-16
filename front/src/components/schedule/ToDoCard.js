import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Checkbox,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";

const TodoCard = ({ data }) => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (data) => () => {
    const currentIndex = checked.indexOf(data);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(data);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <Delete />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton onClick={() => {}} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(data) !== -1}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={data.content} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoCard;
