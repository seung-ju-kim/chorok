import React from "react";
import { Box, Typography } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
const Loading = () => {
  return (
    <Box textAlign="center" mt="40vh">
      <Typography variant="h4">
        Chorok Loading...
        <HourglassBottomIcon fontSize="large" />
      </Typography>
    </Box>
  );
};

export default Loading;
