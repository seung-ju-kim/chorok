import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";

import * as Api from "../../api";

const AccountWithdrwalModal = ({ openWithdrawl, setOpenWithdrawl }) => {
  const navigate = useNavigate();

  const modalStyle = {
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

    // 현재 로그인한 사용자를 삭제
    await Api.delete("users/current");

    // 탈퇴 후 로그인 화면으로 이동
    navigate("/login", { replace: true });
  };

  return (
    <Box>
      <Modal
        open={openWithdrawl}
        onClose={() => setOpenWithdrawl(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            회원가입 탈퇴
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            정말로 탈퇴하시겠습니까 ?
          </Typography>
          <Box sx={{ mt: 5 }} textAlign="right">
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
                mr: 1,
              }}
              onClick={userDelete}
            >
              확인
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
              }}
              onClick={() => {
                setOpenWithdrawl(false);
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
