import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import home from "../imgs/home.png";
import search from "../imgs/search.png";
import social from "../imgs/social.png";
import mypage from "../imgs/mypage.png";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
  },
});

function Footer() {
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
      <Button sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0} sx={{ top: "auto", bottom: 0 }}>
          <Toolbar sx={{ textAlign: "center" }}>
            <Button
              component="div"
              onClick={() => {
                navigate("/");
              }}
              sx={{ flexGrow: 1 }}
            >
              <Box component="img" src={home}></Box>
            </Button>
            <Button
              component="div"
              onClick={() => {
                navigate("/search");
              }}
              sx={{ flexGrow: 1 }}
            >
              <Box component="img" src={search}></Box>
            </Button>
            <Button
              component="div"
              onClick={() => {
                navigate("/social");
              }}
              sx={{ flexGrow: 1 }}
            >
              <Box component="img" src={social}></Box>
            </Button>
            <Button
              component="div"
              onClick={() => {
                navigate("/mypage");
              }}
              sx={{ flexGrow: 1 }}
            >
              <Box component="img" src={mypage}></Box>
            </Button>
          </Toolbar>
        </AppBar>
      </Button>
    </ThemeProvider>
  );
}

export default Footer;
