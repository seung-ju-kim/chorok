import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const { pathname } = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        bgcolor: "white",
        width: "100%",
        py: 1,
        zIndex: 1,
        borderTop: "2px solid #f1f3f5",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          "& .Mui-selected, .Mui-selected > svg": {
            color: "black",
          },
        }}
      >
        <BottomNavigationAction
          icon={<FenceOutlinedIcon />}
          value="1"
          label="MyGarden"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/mygarden");
          }}
        />
        <BottomNavigationAction
          icon={<LocalHospitalOutlinedIcon />}
          value="2"
          label="Diagnosis"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/diagnosis");
          }}
        />
        <BottomNavigationAction
          icon={<ForumOutlinedIcon />}
          value="3"
          label="Community"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/community");
          }}
        />
        <BottomNavigationAction
          icon={<SettingsOutlinedIcon />}
          value="4"
          label="Account"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/account");
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
