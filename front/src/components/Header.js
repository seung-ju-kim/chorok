import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Box, Typography, AppBar, Toolbar } from "@mui/material";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // style
  const logoStyle = {
    color: "#21750f",
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontFamily: "Hi Melody",
    cursor: "pointer",
  };

  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "white", pt: 1 }} elevation={0}>
        <Toolbar>
          <Typography
            sx={logoStyle}
            onClick={() => {
              navigate("/");
            }}
          >
            <IconButton
              sx={{
                color: "#21750f",
                fontWeight: "bold",
              }}
            >
              <EnergySavingsLeafOutlinedIcon fontSize="large" />
            </IconButton>
            Chorok
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
