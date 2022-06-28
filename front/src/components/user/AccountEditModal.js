import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

import * as Api from "../../api";
import { UserStateContext } from "../../App";

const AccountEditModal = ({ openLogin, setOpenLogin }) => {
  // 상태관리
  const userState = useContext(UserStateContext);
  const [user, setUser] = useState(userState.user);
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [description, setDescription] = useState(user.description);

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.put(`users/${user.id}`, {
        name,
        email,
        description,
      });
      setUser(res.data);
      setOpenLogin(false);
      styleSnackbar("회원정보 수정 완료", "success");
    } catch (e) {
      styleSnackbar(e.response.data, "warning");
    }
  };

  // style
  const buttonStyle = {
    mx: "auto",
    bgcolor: "#64a68a",
    color: "white",
    ":hover": { bgcolor: "#64a68a", color: "white" },
  };

  return (
    <Dialog
      open={openLogin}
      onClose={() => {
        setOpenLogin(false);
      }}
    >
      <DialogTitle sx={{ pt: 5, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenLogin(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{ color: "#64a68a", fontWeight: "bold", mb: 3 }}
          >
            초록(Chorok)
          </DialogContentText>
          <DialogContentText align="center" sx={{ color: "#64a68a" }}>
            변경하고자 하는 정보를 입력 후 수정버튼을 눌러주세요.
          </DialogContentText>

          <TextField
            required
            sx={{ mt: 5, bgcolor: "white" }}
            label="Email"
            fullWidth
            disabled
            variant="filled"
            value={email}
            color="success"
          />

          <TextField
            required
            sx={{ mt: 2, bgcolor: "white" }}
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            color="success"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            sx={{ mt: 2, bgcolor: "white" }}
            label="Description"
            type="text"
            fullWidth
            variant="filled"
            color="success"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={buttonStyle}
            type="submit"
            color="success"
            variant="contained"
          >
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AccountEditModal;
