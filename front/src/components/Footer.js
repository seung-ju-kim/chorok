import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
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

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const path = window.location.pathname;
  if (path === "/login" || path === "/register") return null;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        bgcolor: "white",
        width: "100vw",
        height: "10vh",
      }}
    >
      <StyledTabs
        value={value}
        onChange={handleChange}
        centered
        textColor="inherit"
      >
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
          icon={<SpaOutlinedIcon />}
          value="4"
          sx={{ fontSize: "0.5rem", flexGrow: 1 }}
          onClick={() => {
            navigate("/diagnosis");
          }}
        />
      </StyledTabs>
    </Box>
  );
};

export default Footer;
