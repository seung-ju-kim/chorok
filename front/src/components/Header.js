import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
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

const Header = () => {
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
  const paperPropsStyle = {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  };

  // user nav
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              onClick={(e) => {
                anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget);
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls={isMenuOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
            >
              <MenuIcon />

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                PaperProps={paperPropsStyle}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
