import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";

import { DispatchContext } from "../../App";

const AccountWithdrwalModal = ({ openLogout, setOpenLogout }) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 로그인 페이지로 돌아감.
    navigate("/login");
  };

  // style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 4,
  };
  const userDelete = async (e) => {
    e.preventDefault();

    // 탈퇴 후 로그인 화면으로 이동
    navigate("/login", { replace: true });
  };

  return (
    <Box>
      <Modal
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            로그아웃
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            정말로 로그아웃 하시겠습니까?
          </Typography>
          <Box sx={{ mt: 5 }} textAlign="right">
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
                mr: 1,
              }}
              onClick={logout}
            >
              확인
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
              }}
              onClick={() => {
                setOpenLogout(false);
              }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountWithdrwalModal;
