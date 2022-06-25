import React, { useState } from "react";
import { Grid, Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CommunityInfo from "./CommunityInfo";
import CommunityFree from "./CommunityFree";
import CommunityWrite from "./CommunityWrite";

const CommunityMain = () => {
  const navigate = useNavigate();

  const [openWriteForm, setOpenWriteForm] = useState(false);
  
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }} >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="정보공유" value="1" />
            <Tab label="자유" value="2" />
          </TabList>
        </Box>
        <AddIcon 
          onClick = {() => {
            navigate('/community/CommunityWrite')}}
        />
        <TabPanel value="1"><CommunityInfo /></TabPanel>
        <TabPanel value="2"><CommunityFree /></TabPanel>
        
      </TabContext>
      </Box>
    </>
  )
}

export default CommunityMain;