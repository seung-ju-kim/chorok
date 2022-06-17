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

import { useNavigate, useParams } from "react-router-dom";
import "./react-datepicker.css";
import * as Api from "../../api";
import defaultImg from "../../imgs/default_image.png";
import { useEffect } from "react";

const MyPlantImageEditModal = ({
  openImageEditModal,
  setOpenImageEditModal,
}) => {
  const { id } = useParams();
  const navigate = useNavigate("/mygarden");
  // 상태 관리
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: defaultImg,
  });

  useEffect(() => {
    Api.get(`plants/${id}`).then((res) => {
      setImage({ previewURL: res.data.plant.imageURL });
    });
  }, []);

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        imageFile: e.target.files[0],
        previewURL: fileReader.result,
      });
    };
  };

  const deleteImage = () => {
    setImage({
      imageFile: "",
      previewURL: defaultImg,
    });
  };

  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.imageFile);
    try {
      const res = await Api.postForm("image", formData);
      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });
      await Api.put(`plants/${id}`, {
        imageURL: res.data.imageURL,
      });
      setOpenImageEditModal(false);
      navigate(`/mygarden/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={openImageEditModal}
      onClose={() => {
        setOpenImageEditModal(false);
      }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenImageEditModal(false);
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
            sx={{
              color: "#64a68a",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            내 식물 이미지 변경
          </DialogContentText>
          <DialogContentText
            align="center"
            sx={{
              color: "#64a68a",
              fontFamily: "CookieRun-Regular",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            아이의 사진을 등록해주세요!
          </DialogContentText>

          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={image.previewURL}
              width="50%"
              height="50%"
            />
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
                onChange={saveImage}
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
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MyPlantImageEditModal;
