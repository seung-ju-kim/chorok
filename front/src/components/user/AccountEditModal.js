import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  FormHelperText,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

const AccountEditModal = ({ openLogin, setOpenLogin }) => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [user, setUser] = useState(userState.user);
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.put(`users/${user.id}`, {
        name,
        email,
        description,
      });
      const updatedUser = res.data;
      setUser(updatedUser);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
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
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AccountEditModal;
