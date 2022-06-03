import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0} sx={{ top: "auto", bottom: 0 }}>
          <Toolbar sx={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              홈
            </Button>
            <Button
              onClick={() => {
                navigate("/search");
              }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              검색
            </Button>
            <Button
              onClick={() => {
                navigate("/social");
              }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              소셜
            </Button>
            <Button
              onClick={() => {
                navigate("/mypage");
              }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              마이페이지
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
