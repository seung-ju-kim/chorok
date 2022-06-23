import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import defaultImg from "../../imgs/default_image.webp";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import DiagnosisResult from "./DiagnosisResult";
import { Oval } from "react-loader-spinner";
const DiagnosisPicture = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [result, setResult] = useState({
    diseaseList: [],
    imageURL: "",
  });
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image.imageFile);

    try {
      await Api.postForm("diags", formData).then((res) =>
        setResult({
          ...result,
          diseaseList: res.data.diseaseList,
          imageURL: res.data.imageURL,
        })
      );

      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });
      setIsLoading(false);
      setOpenResult(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box sx={{ py: 12, px: "5%" }}>
      {isLoading ? (
        <Box textAlign="center">
          <Typography
            fontFamily="CookieRun-Regular"
            variant="h6"
            sx={{ my: "10vh" }}
          >
            AI 의사가 식물을 진단 중입니다.
          </Typography>

          <Oval
            height="100"
            width="100"
            ariaLabel="loading"
            strokeWidth={5}
            wrapperStyle={{ display: "block" }}
          />
        </Box>
      ) : (
        <>
          <Typography
            fontFamily="CookieRun-Regular"
            variant="h6"
            sx={{ mb: 3 }}
            textAlign="center"
          >
            진단 받을 아이의 사진을 등록해주세요
          </Typography>
          <Box sx={{ textAlign: "center", px: 5 }}>
            <Box
              component="img"
              src={image.previewURL}
              alt="previewImg"
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
            <Box sx={{ textAlign: "center", mt: 5, px: 10 }}>
              <Button
                fullWidth
                variant="contained"
                color="success"
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
              >
                진단받기
              </Button>
            </Box>
          </Box>
        </>
      )}

      <DiagnosisResult
        openResult={openResult}
        setOpenResult={setOpenResult}
        result={result}
      />
    </Box>
  );
};

export default DiagnosisPicture;
