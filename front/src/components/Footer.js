import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tab,
  Tabs,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: 0,
  },
});

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const { pathname } = useLocation();
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
        "& .Mui-selected, .Mui-selected > svg": {
          color: "black",
        },
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<CalendarMonthOutlinedIcon />}
          value="1"
          label="Schedule"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          icon={<FenceOutlinedIcon />}
          value="2"
          label="MyGarden"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/mygarden");
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
