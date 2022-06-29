import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSnackbar } from "notistack";

import * as Api from "../../api";

const CommunityPosting = () => {
  const navigate = useNavigate();
  // 상태관리

  const [image, setImage] = useState({
    imageURL: "",
    upload: false,
  });

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
  });

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 카테고리 선택
  const handleChange = (e) => {
    setPost({ ...post, category: e.target.value });
  };

  // 새로운 식물을 등록하는 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image.imageURL !== "") {
        const formData = new FormData();
        formData.append("file", image.imageURL);
        const res = await Api.postForm("image", formData);

        await Api.post("posts", {
          category: post.category,
          title: post.title,
          content: post.content,
          imageURL: res.data.imageURL,
        });
      } else {
        await Api.post("posts", {
          category: post.category,
          title: post.title,
          content: post.content,
        });
      }

      setImage({
        imageURL: "",
        upload: false,
      });
      setPost({
        title: "",
        content: "",
        category: "",
      });
      navigate(-1);
    } catch (e) {
      styleSnackbar(e.response.data, "warning");
    }
  };

  // style
  const buttonStyle = {
    mx: "auto",
    bgcolor: "#64a68a",
    color: "white",
    ":hover": { bgcolor: "#64a68a", color: "white" },
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ pt: 12, pb: 15, px: "5%" }}
    >
      <Button
        onClick={() => {
          navigate(-1);
        }}
        sx={{ color: "black" }}
      >
        뒤로가기
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography
            textAlign="center"
            fontFamily="CookieRun-Regular"
            fontSize="1.5rem"
          >
            글쓰기
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={post.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="정보공유">정보공유</MenuItem>
              <MenuItem value="자유">자유게시판</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} textAlign="right" sx={{ my: "auto" }}>
          <Button component="label" size="large" sx={{ p: 1, color: "black" }}>
            {image.upload && <CheckBoxIcon />}
            <ImageIcon />
            <Typography variant="h6">이미지 추가</Typography>
            <TextField
              type="file"
              accept="image/*"
              sx={{ display: "none" }}
              onChange={(e) =>
                setImage({
                  imageURL: e.target.files[0],
                  upload: true,
                })
              }
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="content"
            multiline
            rows={15}
            value={post.content}
            onChange={(e) => {
              setPost({ ...post, content: e.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center" sx={{ mt: 3 }}>
        <Button
          type="submit"
          sx={buttonStyle}
          variant="contained"
          color="success"
        >
          작성
        </Button>
      </Grid>
    </Box>
  );
};

export default CommunityPosting;
