import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar } from "@mui/material";

const Footer = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "white", pt: 1 }} elevation={0}>
        <Toolbar>
          <Typography
            sx={{ color: "#21750f", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            🍀 Chorok
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
