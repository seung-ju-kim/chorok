import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import * as Api from "../api";
import { UserStateContext } from "../App";
const Schedule = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [params, userState, navigate]);

  return <Box sx={{ mt: 12 }}>Schedule</Box>;
};

export default Schedule;
