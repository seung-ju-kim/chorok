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
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

import * as Api from "../../api";
import defaultImg from "../../imgs/default_image.png";

const DiaryAddModal = ({ openWriteForm, setOpenWriteForm, setDiaries }) => {
  // useParams, useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // 다이어리 상태 관리
  const [image, setImage] = useState({
    imageURL: "",
    preview: defaultImg,
  });
  const [content, setContent] = useState("");

  // 이미지 등록 시 저장 후 미리보기를 보여주는 이벤트
  const saveFileImage = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        imageURL: e.target.files[0],
        preview: fileReader.result,
      });
    };
  };

  // 등록 된 미리보기 이미지를 삭제하는 이벤트
  const deleteImage = () => {
    setImage({
      imageURL: "",
      preview: defaultImg,
    });
  };

  // 새로운 식물을 등록하는 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image.imageURL !== "") {
        const formData = new FormData();
        formData.append("file", image.imageURL);
        const res = await Api.postForm("image", formData);

        await Api.post("diaries", {
          plantId: id,
          imageURL: res.data.imageURL,
          content,
        });
      } else {
        await Api.post("diaries", {
          plantId: id,
          imageURL: "",
          content,
        });
      }
      const res = await Api.get(`diaries/${id}`);
      setDiaries(res.data.diaries);

      setImage({
        imageURL: "",
        preview: defaultImg,
      });
      setContent("");
      setOpenWriteForm(false);
    } catch (e) {
      console.log(e);
    }
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
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: "white" }}>
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
                type="file"
                accept="image/*"
                sx={{ display: "none" }}
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
          <DialogContentText
            sx={{
              mt: 3,
              color: "black",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          ></DialogContentText>
          <TextField
            required
            sx={{ mt: 3, bgcolor: "white" }}
            placeholder="오늘 식물과 어떤 일이 있었나요?"
            rows={10}
            multiline
            fullWidth
            variant="filled"
            color="success"
            onChange={(e) => setContent(e.target.value)}
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

export default DiaryAddModal;
