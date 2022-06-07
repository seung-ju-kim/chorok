import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
  },
});

const Footer = () => {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar position="fixed" elevation={0} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ textAlign: "center" }}>
          <Button
            sx={{
              flexGrow: 1,
              color: "#404040",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <CalendarMonthOutlinedIcon />
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              color: "#404040",
            }}
            onClick={() => {
              navigate("/mygarden");
            }}
          >
            <FenceOutlinedIcon />
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              color: "#404040",
            }}
            onClick={() => {
              navigate("/community");
            }}
          >
            <ForumOutlinedIcon />
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              color: "#404040",
            }}
            onClick={() => {
              navigate("/diagnosis");
            }}
          >
            <SpaOutlinedIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
