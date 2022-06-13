import React, { useContext } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";

const AccountForm = ({ setOpenLogin, setOpenWithdrawl }) => {
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
  return (
    <Container>
      <List component="nav">
        <ListItem divider>
          <ListItemText
            primary="개인정보 변경"
            secondary="이름, 한 줄 소개 등을 변경합니다."
          />
          <Box textAlign="right">
            <Button
              color="inherit"
              onClick={() => {
                setOpenLogin(true);
              }}
            >
              Edit
            </Button>
          </Box>
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary="로그아웃"
            secondary="계정을 로그아웃 합니다."
          />
          <Box textAlign="right">
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </ListItem>

        <ListItem divider>
          <ListItemText primary="회원탈퇴" secondary="회원을 탈퇴합니다." />
          <Box textAlign="right">
            <Button
              color="error"
              onClick={() => {
                setOpenWithdrawl(true);
              }}
            >
              Withdrawal
            </Button>
          </Box>
        </ListItem>
      </List>
    </Container>
  );
};

export default AccountForm;
