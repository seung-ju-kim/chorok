import React from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Box,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import * as Api from "../../api";
const DiaryAddForm = ({ openWriteForm, setOpenWriteForm }) => {
  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터 : 식물 종류, 식물 이름, 식물 사진, 식물 입양한 날, 물주는 간격

  return (
    <Dialog
      open={openWriteForm}
      onClose={() => {
        setOpenWriteForm(false);
      }}
      fullWidth
    >
      <DialogTitle sx={{ pt: 5, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenWriteForm(false);
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
      <Box component="form" onSubmit={() => {}}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{ color: "#64a68a", fontWeight: "bold", mb: 3 }}
          >
            +
          </DialogContentText>
          <DialogContentText sx={{ color: "#64a68a" }}>
            2022.06.14
          </DialogContentText>

          <TextField
            required
            sx={{ mt: 5, bgcolor: "white" }}
            rows={10}
            multiline
            fullWidth
            variant="filled"
            color="success"
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            작성
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiaryAddForm;
