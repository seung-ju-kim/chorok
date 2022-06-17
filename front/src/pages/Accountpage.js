import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import AccountForm from "../components/user/AccountForm";

const Accountpage = () => {
  return (
    <Box sx={{ pt: 12, pb: 15, px: "5%" }}>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography fontFamily="CookieRun-Regular" fontSize="1.5rem">
            계정 관리
          </Typography>
        </Grid>
        <AccountForm />
      </Grid>
    </Box>
  );
};

export default Accountpage;
