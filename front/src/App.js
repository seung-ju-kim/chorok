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
const Diagnosispage = lazy(() => import("./pages/Diagnosispage"));
const DiagnosisPicture = lazy(() =>
  import("./components/diagnosis/DiagnosisPicture")
);
const CommunityInfoList = lazy(() =>
  import("./components/community/CommunityInfoList")
);
const CommunityFreeList = lazy(() =>
  import("./components/community/CommunityFreeList")
);
const CommunityInfoCommentAddModal = lazy(() =>
  import("./components/community/CommunityInfoCommentAddModal")
);

const CommunityInfoCommentDummy = lazy(() =>
  import("./components/community/CommunityInfoCommentDummy")
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
      <CssBaseline />
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <Router>
            <Header />
            <Footer />
            <Suspense fallback={<div>Loading..</div>}>
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
                <Route path="/community" element={<Communitypage />} />
                <Route path="/diagnosis" element={<Diagnosispage />} />
                <Route
                  path="/diagnosis/picture"
                  element={<DiagnosisPicture />}
                />
                <Route
                  path="/community/CommunityInfoList"
                  element={<CommunityInfoList />}
                />
                <Route
                  path="/community/:id"
                  element={<CommunityInfoCommentDummy />}
                />
                <Route
                  path="/community/CommunityFreeList"
                  element={<CommunityFreeList />}
                />
                <Route path="*" element={<Main />} />
              </Routes>
            </Suspense>
          </Router>
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
