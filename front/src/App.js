import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import * as Api from "./api";
import { loginReducer } from "./reducer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Accountpage from "./pages/Accountpage";
import Main from "./components/Main";
import MyGarden from "./pages/MyGarden";
import Diagnosis from "./pages/Diagnosis";
import Community from "./pages/Community";
import "./App.css";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans KR, sans-serif",
  },
});

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };
  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }
  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <Router>
            <Header />
            <Footer />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Registerpage />} />
              <Route path="/account" element={<Accountpage />} />
              <Route path="/mygarden" element={<MyGarden />} />
              <Route path="/community" element={<Community />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </Router>
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
