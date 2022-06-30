import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import Diagnosis from "../components/diagnosis/Diagnosis";
import diagnosis from "../imgs/diagnosis.jpg";

const Diagnosispage = () => {
  return (
    <>
      <Box sx={{ pt: 12 }}>
        <Typography
          fontFamily="CookieRun-Regular"
          fontSize="1.5rem"
          sx={{ mx: "5%", mb: 3 }}
        >
          식물 병해 진단
        </Typography>
      </Box>
      <Box
        sx={{
          background: `url(${diagnosis})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Grid container>
          <Diagnosis />
        </Grid>
      </Box>
    </>
  );
};

export default Diagnosispage;
