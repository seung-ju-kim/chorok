import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/diagnosis" || pathname.split("/")[1] === "diagnosis") {
      setValue("2");
    } else if (
      pathname === "/community" ||
      pathname.split("/")[1] === "community"
    ) {
      setValue("3");
    } else if (pathname === "/account") {
      setValue("4");
    } else {
      setValue("1");
    }
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // style
  const footerStlye = {
    position: "fixed",
    bottom: 0,
    bgcolor: "white",
    width: "100%",
    py: 1,
    zIndex: 1,
    borderTop: "2px solid #f1f3f5",
  };

  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <Box sx={footerStlye}>
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
