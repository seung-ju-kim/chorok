import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import * as Api from "../../api";

const AccountForm = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("users/current").then((res) => setUser(res.data));
  }, []);

  // const handle

  return (
    <Grid container sx={{ px: 2, mt: 10 }}>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant="h6">프로필 정보</Typography>
      </Grid>
      <Grid item xs={10} sx={{ mb: 5 }}>
        <Typography variant="body1">이메일1</Typography>
        <Typography variant="h6"></Typography>
      </Grid>
      <Grid item xs={10} sx={{ mb: 5 }}>
        <Typography variant="body1">닉네임</Typography>
        <Typography variant="h6"></Typography>
      </Grid>

      <Button
        fullWidth
        sx={{
          color: "#1e7008",
          mt: "20vh",
        }}
      >
        비밀번호 변경
      </Button>
      <Button
        fullWidth
        sx={{
          mt: 2,
          color: "gray",
        }}
      >
        회원탈퇴
      </Button>
    </Grid>
  );
};

export default AccountForm;
