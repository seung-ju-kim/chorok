import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import logo from "../imgs/logo.png";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
  },
});

function Header() {
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
  if (window.location.path === "/login") return null;
  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box
                component="img"
                src={logo}
                width="30px"
                sx={{ my: 2, cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              />
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
