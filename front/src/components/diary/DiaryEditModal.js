import React, { useState } from "react";
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

const DiaryEditModal = ({
  handleEvent,
  content,
  setContent,
  openEditModal,
  setOpenEditModal,
}) => {
  return (
    <Dialog
      open={openEditModal}
      onClose={() => {
        setOpenEditModal(false);
      }}
      fullWidth
      sx={{ mx: "auto" }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenEditModal(false);
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
      <Box component="form" onSubmit={handleEvent}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{
              color: "#64a68a",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            다이어리 수정
          </DialogContentText>
          <DialogContentText
            align="center"
            sx={{ color: "#64a68a", fontFamily: "CookieRun-Regular", mb: 3 }}
          >
            다이어리를 수정합니다.
          </DialogContentText>
          <TextField
            required
            sx={{ mt: 3, bgcolor: "white" }}
            placeholder="오늘 식물과 어떤 일이 있었나요?"
            rows={10}
            multiline
            fullWidth
            variant="filled"
            color="success"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{
              mx: "auto",
              bgcolor: "#64a68a",
              color: "white",
              ":hover": {
                bgcolor: "#64a68a",
                color: "white",
              },
            }}
            type="submit"
            variant="contained"
            color="success"
          >
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiaryEditModal;
