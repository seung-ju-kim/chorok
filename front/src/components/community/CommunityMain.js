import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import CommunityList from "./CommunityList";
import * as Api from "../../api";

const CommunityMain = () => {
  // 탭 상태 관리
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const getInfoList = () => {
    Api.get(`posts?category=정보공유&page=1&perPage=10`).then((res) =>
      setBoards(res.data.posts)
    );
  };
  const getFreeList = () => {
    Api.get(`posts?category=자유&page=1&perPage=10`).then((res) =>
      setBoards(res.data.posts)
    );
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          position: "fixed",
          bgcolor: "white",
          px: "3%",
          width: "100%",
          zIndex: 2,
        }}
      >
        <TabList
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTabs-indicator": {
              display: "flex",
              justifyContent: "center",
              bgcolor: "#64a68a",
            },
          }}
        >
          <Tab
            label="정보공유"
            sx={{
              fontFamily: "CookieRun-Regular",
              fontSize: "1.2rem",
            }}
            value="1"
            onClick={() => {
              navigate("/community/infoBoard");
            }}
          />
          <Tab
            label="자유게시판"
            sx={{
              fontFamily: "CookieRun-Regular",
              fontSize: "1.2rem",
            }}
            value="2"
            onClick={() => {
              navigate("/community/freeBoard");
            }}
          />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        <CommunityList
          getList={getInfoList}
          boards={boards}
          setBoards={setBoards}
        />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        <CommunityList
          getList={getFreeList}
          boards={boards}
          setBoards={setBoards}
        />
      </TabPanel>
    </TabContext>
  );
};

export default CommunityMain;
