import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
function DetailSearchpage() {
  const params = useParams();
  return <Box sx={{ mt: 5, mb: 8 }}>{params.plantName}</Box>;
}

export default DetailSearchpage;
