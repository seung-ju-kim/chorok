import React from "react";
import { Box } from "@mui/material";

import CommunityMain from "../components/community/CommunityMain";

const Community = () => {
  return (
    <Box
      sx={{
        my: 8,
        color: "black",
        overflow: "auto",
      }}
    >
      <CommunityMain />
    </Box>
  );
};

export default Community;
