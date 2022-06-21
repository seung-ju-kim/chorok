import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Box, Typography, AppBar, Toolbar } from "@mui/material";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
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
            onClick={() => {
              navigate("/");
            }}
          >
            <IconButton
              sx={{ color: "#21750f", fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <EnergySavingsLeafOutlinedIcon />
            </IconButton>
            Chorok
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
