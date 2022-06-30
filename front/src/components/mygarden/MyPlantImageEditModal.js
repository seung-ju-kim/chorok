import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import "./react-datepicker.css";
import * as Api from "../../api";
import defaultImg from "../../imgs/default_image.jpg";

const MyPlantImageEditModal = ({
  plants,
  setPlants,
  openImageEditModal,
  setOpenImageEditModal,
}) => {
  // 편집한 식물 상태 관리
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: "",
  });

  // 이미지 미리보기 사진 연결
  useEffect(() => {
    setImage({ previewURL: plants.imageURL });
  }, [plants]);

  const { id } = useParams();
  const navigate = useNavigate("/mygarden");

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 이미지 등록 시 저장 후 미리보기를 보여주는 이벤트
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
  // 등록 된 미리보기 이미지를 삭제하는 이벤트
  const deleteImage = () => {
    setImage({
      imageFile: "",
      previewURL: defaultImg,
    });
  };

  // 새로운 식물을 등록하는 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.imageFile);
    try {
      const res = await Api.postForm("image", formData);
      setPlants({ ...plants, imageURL: res.data.imageURL });
      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });

      await Api.put(`plants/${id}`, {
        imageURL: plants.imageURL,
      });

      setOpenImageEditModal(false);
    } catch (e) {
      styleSnackbar(e.response.data, "warning");
    }
  };

  return (
    <Dialog
      open={openImageEditModal}
      onClose={() => {
        setOpenImageEditModal(false);
      }}
      fullWidth
      maxWidth="lg"
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
              width="100%"
              height="auto"
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

export default MyPlantImageEditModal;
