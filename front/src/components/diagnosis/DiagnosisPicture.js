import React, { useState } from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { Oval } from "react-loader-spinner";
import { useSnackbar } from "notistack";

import defaultImg from "../../imgs/default_image.jpg";
import * as Api from "../../api";
import DiagnosisResult from "./DiagnosisResult";

const DiagnosisPicture = () => {
  // 상태관리
  const [isLoading, setIsLoading] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [result, setResult] = useState({
    diseaseList: [],
    imageURL: "",
  });
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: defaultImg,
  });

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 이미지 미리보기 저장
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
  // 미리보기 삭제
  const deleteImage = () => {
    setImage({
      imageFile: "",
      previewURL: defaultImg,
    });
  };

  // 진단 결과 받아오기
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image.imageFile);

    try {
      const res = await Api.postForm("diags", formData);
      setResult({
        ...result,
        diseaseList: res.data.diseaseList,
        imageURL: res.data.imageURL,
      });

      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });
      setIsLoading(false);
      setOpenResult(true);
    } catch (e) {
      setIsLoading(false);
      styleSnackbar(e.response.data, "warning");
    }
  };
  return (
    <Box sx={{ pt: 12, pb: 15, px: "5%" }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography fontFamily="CookieRun-Regular" fontSize="1.5rem">
            식물 병해 진단
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box textAlign="center">
          <Typography
            fontFamily="CookieRun-Regular"
            variant="h6"
            sx={{ my: "10vh" }}
          >
            AI 의사가 식물을 진단 중입니다. 잠시만 기다려주세요.
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
            textAlign="center"
          >
            진단 받을 아이의 사진을 등록해주세요
          </Typography>
          <Box sx={{ textAlign: "center", my: 3 }}>
            <Box
              component="img"
              src={image.previewURL}
              alt="previewImg"
              width="100%"
              height="100%"
              maxWidth={700}
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
                  maxWidth: "700px",
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
