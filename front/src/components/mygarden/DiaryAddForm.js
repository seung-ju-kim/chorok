import React, { useState } from "react";
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
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import * as Api from "../../api";
const DiaryAddForm = ({ openWriteForm, setOpenWriteForm }) => {
  const today = new Date();
  // 상태 관리
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
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
          {fileImage ? (
            <Box sx={{ textAlign: "center" }}>
              <Box component="img" src={fileImage} width="100%" height="50%" />
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <CameraAltOutlinedIcon />
            </Box>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button
              component="label"
              sx={{
                p: 2,
                color: "#64a68a",
                border: "2px solid #64a68a",
                borderRadius: "10%",
                mr: 2,
              }}
            >
              등록
              <TextField
                name="imgUpload"
                label="파일"
                id="input-file"
                type="file"
                accept="imgage/*"
                sx={{ display: "none" }}
                variant="filled"
                color="success"
                onChange={saveFileImage}
              />
            </Button>
            <Button
              sx={{
                p: 2,
                color: "#64a68a",
                border: "2px solid #64a68a",
                borderRadius: "10%",
              }}
              onClick={() => deleteFileImage()}
            >
              삭제
            </Button>
          </Box>
          <DialogContentText
            sx={{
              mt: 3,
              color: "black",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            {today.toISOString().split("T")[0]}
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
