import React from "react";
import { Box, Typography } from "@mui/material";
import "../App.css";
import video from "../video/main.mp4";
import LoginForm from "../components/user/LoginForm";

const Loginpage = () => {
  // style
  const textBoxStyle = {
    color: "white",
    position: "absolute",
    top: "15%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, 50%)",
    zIndex: 1,
  };
  const videoBoxStyle = {
    width: "100%",
    height: "calc(var(--vh, 1vh) * 100)",
    overflow: "hidden",
    "&::before": {
      display: "block",
      content: "''",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#151516",
      opacity: "0.5",
      position: "absolute",
    },
  };
  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  return (
    <>
      <Box sx={textBoxStyle}>
        <Typography
          align="center"
          fontSize="4rem"
          fontWeight="bold"
          fontFamily="Hi Melody"
        >
          Chorok
        </Typography>
        <Typography align="center" fontSize="1.5rem" fontFamily="Hi Melody">
          누구나 손 쉽게 홈 가드닝, 초록
        </Typography>
      </Box>
      <Box sx={videoBoxStyle}>
        <Box
          component="video"
          muted
          autoPlay
          loop
          sx={videoStyle}
          playsInline
          controls={false}
        >
          <Box component="source" src={video} type="video/mp4" />
        </Box>
        <LoginForm />
      </Box>
    </>
  );
};

export default Loginpage;
