import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Diagnosis from "../components/diagnosis/Diagnosis";
const Diagnosispage = () => {
  return (
    <Box sx={{ pt: 12, pb: 15 }}>
      <Typography
        fontFamily="CookieRun-Regular"
        fontSize="1.5rem"
        sx={{ mx: "5%", mb: 5 }}
      >
        식물 병해 진단
      </Typography>
      <Grid container>
        <Diagnosis />
      </Grid>
    </Box>
  );
};

export default Diagnosispage;
