import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs, Box } from "@mui/material";
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
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        bgcolor: "white",
        width: "100%",
        p: 2,
      }}
    >
      <StyledTabs value={value} onChange={handleChange} textColor="inherit">
        <LinkTab
          icon={<CalendarMonthOutlinedIcon />}
          value="1"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/");
          }}
        />
        <LinkTab
          icon={<FenceOutlinedIcon />}
          value="2"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/mygarden");
          }}
        />
        <LinkTab
          icon={<ForumOutlinedIcon />}
          value="3"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/community");
          }}
        />
        <LinkTab
          icon={<SettingsOutlinedIcon />}
          value="4"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/account");
          }}
        />
      </StyledTabs>
    </Box>
  );
};

export default Footer;
