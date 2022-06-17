import React from "react";
import { Box } from "@mui/material";

import AccountForm from "../components/user/AccountForm";

const Accountpage = () => {
  return (
    <Box sx={{ my: 12, px: "5%" }}>
      <AccountForm />
    </Box>
  );
};

export default Accountpage;
