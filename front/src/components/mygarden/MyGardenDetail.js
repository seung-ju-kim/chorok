import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DiaryTab from "./DiaryTab";
import CalendarTab from "./CalendarTab";
import EditIcon from "@mui/icons-material/Edit";

const MyGardenDetail = () => {
  const [value, setValue] = useState("1");
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          color: "black",
        }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs"
              textColor="inherit"
              sx={{
                position: "fixed",
                bgcolor: "white",
                top: 0,
                width: "100%",
                p: 3,
                "& .MuiTabs-indicator": {
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "#64a68a",
                },
                pl: 3,
              }}
            >
              <Tab label="Diary" value="1" />
              <Tab label="Calendar" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0, my: 15 }}>
            <DiaryTab />
          </TabPanel>
          <TabPanel value="2">
            <CalendarTab />
          </TabPanel>
        </TabContext>
        <EditIcon
          sx={{
            position: "fixed",
            right: "5%",
            bottom: "8%",
            fontSize: "7rem",
            color: "#64a68a",
            borderRadius: "50%",
            boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
            bgcolor: "white",
            p: 3,
          }}
        />
      </Box>
    </>
  );
};

export default MyGardenDetail;
