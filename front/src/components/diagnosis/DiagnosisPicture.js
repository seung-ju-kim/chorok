import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import defaultImg from "../../imgs/default_image.png";
import * as Api from "../../api";
const DiagnosisPicture = () => {
  // 상태 관리
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: defaultImg,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.imageFile);
    try {
      const res = await Api.postForm("diags", formData);
      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box sx={{ py: 12, px: "5%" }}>
      <Typography
        fontFamily="CookieRun-Regular"
        variant="h6"
        sx={{ mb: 3 }}
        textAlign="center"
      >
        진단 받을 아이의 사진을 등록해주세요
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Box
          component="img"
          src={image.previewURL}
          width="100%"
          height="100%"
        />
      </Box>

      <Box
        sx={{ textAlign: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
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
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            fullWidth
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            진단받기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DiagnosisPicture;
