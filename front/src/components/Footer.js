import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  return (
    <Box
      sx={{ position: "fixed", bottom: 0, width: "100%", typography: "body1" }}
    >
      <StyledTabs
        value={value}
        onChange={handleChange}
        centered
        textColor="inherit"
      >
        <LinkTab
          icon={<CalendarMonthOutlinedIcon />}
          label="Schedule"
          value="1"
          sx={{ fontSize: "min(2rem,3vw)" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <LinkTab
          icon={<FenceOutlinedIcon />}
          label="MyGarden"
          value="2"
          sx={{ fontSize: "min(2rem,3vw)" }}
          onClick={() => {
            navigate("/mygarden");
          }}
        />
        <LinkTab
          icon={<ForumOutlinedIcon />}
          label="Community"
          value="3"
          sx={{ fontSize: "min(2rem,3vw)" }}
          onClick={() => {
            navigate("/community");
          }}
        />
        <LinkTab
          icon={<SpaOutlinedIcon />}
          label="Diagnosis"
          value="4"
          sx={{ fontSize: "min(2rem,3vw)" }}
          onClick={() => {
            navigate("/diagnosis");
          }}
        />
      </StyledTabs>
    </Box>
  );
};

export default Footer;
