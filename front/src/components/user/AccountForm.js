import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
const AccountForm = ({ setOpenLogin, setOpenWithdrawl }) => {
  return (
    <Container>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          mt: 3,
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        <ListItem divider>
          <ListItemText
            primary="개인정보 변경"
            secondary="이메일, 이름 등을 변경합니다."
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
          <ListItemText primary="회원탈퇴" secondary="회원을 탈퇴합니다." />
          <Box textAlign="right">
            <Button
              color="inherit"
              sx={{ color: "gray" }}
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
