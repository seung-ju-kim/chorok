import React from "react";
import { Box, Typography } from "@mui/material";

import video from "../video/main.webm";
import LoginForm from "../components/user/LoginForm";

const Loginpage = () => {
  // style
  const boxStyle = {
    color: "white",
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translate(-50%, 50%)",
    zIndex: 3,
  };
  const videoBoxStyle = {
    width: "100vw",
    height: "100vh",
    display: "block",
    "&::before": {
      content: "''",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#151516",
      opacity: "0.5",
      position: "absolute",
    },
    overflowY: "hidden",
  };
  const videoStyle = {
    width: "100vw",
    height: "100vh",
    objectFit: "fill",
  };
  return (
    <>
      <Box sx={boxStyle}>
        <Typography align="center" variant="h4" fontWeight="bold">
          Chorok
        </Typography>
        <Typography align="center" fontSize="0.8rem">
          누구나 손 쉽게 홈 가드닝, 초록
        </Typography>
      </Box>
      <Box sx={videoBoxStyle}>
        <Box
          component="video"
          muted
          autoPlay
          data-keepplaying
          loop
          sx={videoStyle}
        >
          <Box component="source" src={video} type="video/webm" />
        </Box>
        <LoginForm></LoginForm>
      </Box>
    </>
  );
};

export default Loginpage;
