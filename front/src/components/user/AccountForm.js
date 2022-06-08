import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
const AccountForm = () => {
  return (
    <Grid container sx={{ px: 2, mt: 3 }}>
      <Grid item xs={12}>
        <Box component="img"></Box>
      </Grid>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Typography variant="h6">프로필 정보</Typography>
      </Grid>
      <Grid item xs={10} sx={{ mb: 7 }}>
        <Typography variant="body1">이메일</Typography>
        <Typography variant="h6">test@test.com</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button sx={{ color: "#1e7008" }}>수정</Button>
      </Grid>
      <Grid item xs={10} sx={{ mb: 7 }}>
        <Typography variant="body1">닉네임</Typography>
        <Typography variant="h6">admin</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button sx={{ color: "#1e7008" }}>수정</Button>
      </Grid>
      <Button
        fullWidth
        sx={{
          mt: "20vh",
          color: "gray",
        }}
      >
        회원탈퇴
      </Button>
    </Grid>
  );
};

export default AccountForm;
