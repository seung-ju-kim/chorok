import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
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
  const [infoBoards, setInfoBoards] = useState([]);
  const [freeBoards, setFreeBoards] = useState([]);

  // 정보공유 게시판 불러오기
  const getInfoList = async (page, perPage) => {
    const res = await Api.get(
      `posts?category=정보공유&page=${page}&perPage=${perPage}`
    );

    return res.data;
  };
  // 자유게시판 불러오기
  const getFreeList = async (page, perPage) => {
    const res = await Api.get(
      `posts?category=자유&page=${page}&perPage=${perPage}`
    );

    return res.data;
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
          />
          <Tab
            label="자유게시판"
            sx={{
              fontFamily: "CookieRun-Regular",
              fontSize: "1.2rem",
            }}
            value="2"
          />
        </TabList>
      </Box>
      <TabPanel value="1" sx={{ p: 0 }}>
        <CommunityList
          getList={getInfoList}
          boards={infoBoards}
          setBoards={setInfoBoards}
        />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        <CommunityList
          getList={getFreeList}
          boards={freeBoards}
          setBoards={setFreeBoards}
        />
      </TabPanel>
    </TabContext>
  );
};

export default CommunityMain;
