import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  lazy,
  Suspense,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import Header from "./components/Header";
import Footer from "./components/Footer";

import * as Api from "./api";
import { loginReducer } from "./reducer";
import "./App.css";

const Loginpage = lazy(() => import("./pages/Loginpage"));
const Registerpage = lazy(() => import("./pages/Registerpage"));
const Accountpage = lazy(() => import("./pages/Accountpage"));
const Main = lazy(() => import("./components/Main"));
const MyGardenpage = lazy(() => import("./pages/MyGardenpage"));
const MyPlant = lazy(() => import("./components/mygarden/MyPlant"));
const MyScheduleList = lazy(() =>
  import("./components/schedule/MyScheduleList")
);
const Communitypage = lazy(() => import("./pages/Communitypage"));
const CommunityPosting = lazy(() =>
  import("./components/community/CommunityPosting")
);
const CommunityCardDetail = lazy(() =>
  import("./components/community/CommunityCardDetail")
);
const Diagnosispage = lazy(() => import("./pages/Diagnosispage"));
const DiagnosisPicture = lazy(() =>
  import("./components/diagnosis/DiagnosisPicture")
);
export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

const theme = createTheme({
  typography: {
    fontFamily: "EF_Diary",
  },
});

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 모바일 사이즈
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
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
  };
  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <SnackbarProvider
            maxSnack={3}
            sx={{
              "& .SnackbarContent-root": {},
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Router>
              <Header />
              <Footer />
              <Suspense>
                <Routes>
                  <Route path="/" exact element={<Main />} />
                  <Route path="/login" element={<Loginpage />} />
                  <Route path="/register" element={<Registerpage />} />
                  <Route path="/account" element={<Accountpage />} />
                  <Route path="/mygarden" element={<MyGardenpage />} />
                  <Route path="/mygarden/:id" element={<MyPlant />} />
                  <Route
                    path="/mygarden/myschedule"
                    element={<MyScheduleList />}
                  />
                  <Route path="/diagnosis" element={<Diagnosispage />} />
                  <Route
                    path="/diagnosis/picture"
                    element={<DiagnosisPicture />}
                  />
                  <Route path="/community" element={<Communitypage />} />
                  <Route
                    path="/community/infoBoard/:id"
                    element={<CommunityCardDetail />}
                  />
                  <Route
                    path="/community/freeBoard/:id"
                    element={<CommunityCardDetail />}
                  />
                  <Route
                    path="/community/posting"
                    element={<CommunityPosting />}
                  />
                  <Route path="*" element={<Main />} />
                </Routes>
              </Suspense>
            </Router>
          </SnackbarProvider>
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
