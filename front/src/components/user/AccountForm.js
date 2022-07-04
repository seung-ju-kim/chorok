import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, List, ListItem, ListItemText, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";

import ConfirmDialog from "../dialog/ConfirmDialog";
import { DispatchContext } from "../../App";
import AccountEditModal from "./AccountEditModal";
import * as Api from "../../api";

const AccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  // modal 상태 관리
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openWithdrawl, setOpenWithdrawl] = useState(false);

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 로그아웃 클릭 시 실행되는 이벤트
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 로그인 페이지로 돌아감.
    navigate("/login");
    styleSnackbar("로그아웃", "success");
  };

  // 회원 탈퇴 클릭 시 실행되는 이벤트
  const userDelete = async (e) => {
    e.preventDefault();
    try {
      // 현재 로그인한 사용자를 삭제
      await Api.delete("users/current");
      styleSnackbar("회원탈퇴", "success");
      // 탈퇴 후 로그인 화면으로 이동
      navigate("/login", { replace: true });
    } catch (e) {
      styleSnackbar(e.response.data, "warning");
    }
  };

  return (
    <Grid item xs={12}>
      <List component="nav" sx={{ width: "100%" }}>
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
            <Button
              color="inherit"
              onClick={() => {
                setOpenLogout(true);
              }}
            >
              Logout
            </Button>
          </Box>
        </ListItem>
        <ListItem divider>
          <ListItemText primary="버전 정보" secondary="v1.2.0-release2" />
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
      <AccountEditModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <ConfirmDialog
        openModal={openLogout}
        setOpenModal={setOpenLogout}
        handleEvent={logout}
        title="로그아웃"
        subTitle="정말로 로그아웃 하시겠습니까?"
      />
      <ConfirmDialog
        openModal={openWithdrawl}
        setOpenModal={setOpenWithdrawl}
        handleEvent={userDelete}
        title="회원탈퇴"
        subTitle="정말로 탈퇴 하시겠습니까?"
      />
    </Grid>
  );
};

export default AccountForm;
