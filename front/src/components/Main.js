import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserStateContext } from "../App";
import MyGardenpage from "../pages/MyGardenpage";

const Main = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [params, userState]);

  return <MyGardenpage />;
};

export default Main;
