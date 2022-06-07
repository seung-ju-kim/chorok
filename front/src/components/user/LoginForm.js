import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { DispatchContext } from "../../App";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 login 실패 여부를 판단함.
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const validatePassword = (password) => {
    return password.length >= 4;
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  //위 validateEmail 함수를 통해 패스워드 형태 적합 여부를 확인함.
  const isPasswordValid = validatePassword(password);
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      // navigate('/', { replace: true });
      window.location.replace("/");
    } catch (err) {
      setIsLoginFail(true);
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };
  const boxStyle = {
    color: "white",
    position: "absolute",
    bottom: "30%",
    left: "50%",
    transform: "translate(-50%, 50%)",
    zIndex: 3,
  };

  return (
    <Box component="form" sx={boxStyle}>
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 5, bgcolor: "white", width: "80vw" }}
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        variant="filled"
        value={email}
        color="success"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        autoComplete="off"
        required
        sx={{ mt: 2, bgcolor: "white" }}
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        variant="filled"
        color="success"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button
          fullWidth
          sx={{ bgcolor: "#64a68a", color: "white" }}
          size="large"
          type="submit"
          disabled={!isFormValid}
        >
          Login
        </Button>
      </Box>
      <Box textAlign="center" sx={{ mt: 1 }}>
        <Button
          fullWidth
          sx={{
            bgcolor: "#64a68a",
            color: "white",
          }}
          size="large"
          onClick={() => {
            navigate("/register");
          }}
          disabled={!isFormValid}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
