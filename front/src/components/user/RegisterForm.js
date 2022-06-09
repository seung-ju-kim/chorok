import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";

const RegisterForm = () => {
  const navigate = useNavigate();
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("users/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      if (err.response.status === 400) {
      }
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <Box sx={{ px: 5, mt: 3 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        초록에 오신 것을 환영합니다.
      </Typography>
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 5, bgcolor: "white" }}
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
        value={email}
        color="success"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 2, bgcolor: "white" }}
        margin="dense"
        label="password"
        type="Password"
        fullWidth
        variant="outlined"
        color="success"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 2, bgcolor: "white" }}
        margin="dense"
        label="ConfirmPassword"
        type="Password"
        fullWidth
        variant="outlined"
        color="success"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 2, bgcolor: "white" }}
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        variant="outlined"
        color="success"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        fullWidth
        sx={{
          bgcolor: "#64a68a",
          color: "white",
          mt: 20,
          ":hover": {
            color: "#64a68a",
            bgcolor: "white",
          },
        }}
        size="large"
        disabled={!isFormValid}
        type="submit"
      >
        계속하기
      </Button>
    </Box>
  );
};

export default RegisterForm;
