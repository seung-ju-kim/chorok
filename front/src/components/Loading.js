import React from "react";
import { Box } from "@mui/material";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <Box textAlign="center" sx={{ width: "100%" }}>
      <Oval
        height="100"
        width="100"
        ariaLabel="loading"
        strokeWidth={5}
        wrapperStyle={{ display: "block" }}
      />
    </Box>
  );
};

export default Loading;
