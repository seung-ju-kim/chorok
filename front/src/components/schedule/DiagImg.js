import React, { useState } from "react";
import defaultImg from "../../imgs/default_image.png";
import * as Api from "../../api";
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

const DiagImg = ({ openDiagPlant, setOpenDiagPlant }) => {
  const [image, setImage] = useState({
    imageUrl: "",
    preview: defaultImg,
  });

  // 사진 저장
  const saveFileImage = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        imageUrl: e.target.files[0],
        preview: fileReader.result,
      });
    };
  };
  const deleteImage = () => {
    setImage({
      imageUrl: "",
      preview: defaultImg,
    });
  };
  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imageUrl", image.imageUrl);
      await Api.post("/diags", formData);
      setImage({
        imageUrl: "",
        preview: defaultImg,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      open={openDiagPlant}
      onClose={() => {
        setOpenDiagPlant(false);
      }}
    >
      <DialogTitle sx={{ pt: 5, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDiagPlant(false);
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
            진단 받고 싶은 식물 사진을 등록해주세요!
          </DialogContentText>

          <Box sx={{ textAlign: "center" }}>
            <Box component="img" src={image.preview} width="50%" height="50%" />
          </Box>

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
                required
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
              onClick={deleteImage}
            >
              삭제
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            추가
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiagImg;
