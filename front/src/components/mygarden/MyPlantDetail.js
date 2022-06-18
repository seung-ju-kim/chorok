import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DiaryTab from "./DiaryTab";
import CareTab from "./CareTab";

const MyPlantDetail = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          py: 8,
          color: "black",
          overflow: "auto",
        }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs"
              textColor="inherit"
              sx={{
                bgcolor: "white",
                width: "90%",

                "& .MuiTabs-indicator": {
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "#64a68a",
                },
              }}
            >
              <Tab
                label="식물 관리"
                sx={{
                  fontFamily: "CookieRun-Regular",
                  fontSize: "1.2rem",
                }}
                value="1"
              />
              <Tab
                label="다이어리"
                sx={{
                  fontFamily: "CookieRun-Regular",
                  fontSize: "1.2rem",
                }}
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CareTab />
          </TabPanel>
          <TabPanel value="2">
            <DiaryTab />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default MyPlantDetail;
