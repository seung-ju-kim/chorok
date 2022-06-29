import React from "react";
import { Box } from "@mui/material";

import CommunityMain from "../components/community/CommunityMain";

const Communitypage = ({ type }) => {
  return (
    <Box
      sx={{
        my: 8,
        color: "black",
        overflow: "auto",
      }}
    >
      <CommunityMain type={type} />
    </Box>
  );
};

export default Communitypage;
