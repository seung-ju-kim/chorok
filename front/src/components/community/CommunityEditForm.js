import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";

import * as Api from "../../api";

const CommunityEditForm = ({ board, setBoard, setIsEditing }) => {
  const navigate = useNavigate();

  // 커뮤니티 게시물 수정
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`posts/${board._id}`, {
        title: board.title,
        content: board.content,
      });
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mx: "auto" }}>
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
            value={board?.title}
            fullWidth
            onChange={(e) => {
              setBoard({ ...board, title: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={board.content}
            label="content"
            multiline
            rows={15}
            onChange={(e) => {
              setBoard({ ...board, content: e.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button type="submit">작성</Button>
        <Button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          취소
        </Button>
      </Grid>
    </Box>
  );
};

export default CommunityEditForm;
