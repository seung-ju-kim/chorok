import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText, Box, Button } from "@mui/material";

import AccountEditModal from "./AccountEditModal";
import AccountLogoutModal from "./AccountLogoutModal";
import AccountWithdrwalModal from "./AccountWithdrwalModal";

const AccountForm = () => {
  // modal 관리
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openWithdrawl, setOpenWithdrawl] = useState(false);

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
          <ListItemText primary="버전 정보" secondary="1.0.0" />
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
      <AccountLogoutModal
        openLogout={openLogout}
        setOpenLogout={setOpenLogout}
      />
      <AccountWithdrwalModal
        openWithdrawl={openWithdrawl}
        setOpenWithdrawl={setOpenWithdrawl}
      />
    </Grid>
  );
};

export default AccountForm;
