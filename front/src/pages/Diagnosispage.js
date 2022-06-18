import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Diagnosis from "../components/diagnosis/Diagnosis";
const Diagnosispage = () => {
  return (
    <Box sx={{ pt: 12, pb: 15 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5, mx: "5%" }}>
          <Typography fontFamily="CookieRun-Regular" fontSize="1.5rem">
            식물 병해 진단
          </Typography>
        </Grid>
        <Diagnosis />
      </Grid>
    </Box>
  );
};

export default Diagnosispage;
