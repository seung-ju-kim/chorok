import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../App";
import { Box, Menu, MenuItem, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 로그인 페이지로 돌아감.
    navigate("/login");
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

  const path = window.location.pathname;
  if (path === "/login" || path === "/register") return null;
  return (
    <Box
      position="fixed"
      sx={{ top: 0, bgcolor: "white", width: "100vw", height: "10vh" }}
    >
      <Box position="fixed" sx={{ top: 20, right: 15 }}>
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
      </Box>
    </Box>
  );
};

export default Header;
