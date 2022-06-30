import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Input,
} from "@mui/material";

import * as Api from "../../api";
import { useParams } from "react-router-dom";
import CommunityComment from "./CommunityComment";
import { useSnackbar } from "notistack";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const CommunityCommentModal = ({ openAddComment, setOpenAddComment }) => {
  const [comment, setComment] = useState("");
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); //로딩 스피너

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  const getComment = useCallback(async () => {
    setIsLoading(true);
    // Get Data Code
    const res = await Api.get(`comments?postId=${id}&page=${page}&perPage=15`);
    if (res.data.comments) {
      setContentList((prev) => [...prev, ...res.data.comments]);
    }
    setIsLoading(false);
  }, [page, id]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`comments`, {
        postId: id,
        content: comment,
      });

      const res = await Api.get(`comments?postId=${id}&page=1&perPage=15`);
      setPage(1);
      setContentList(res.data.comments);
      setComment("");
    } catch (e) {
      const errorMessage = e.response.data;
      styleSnackbar(errorMessage, "warning");
    }
  };

  useEffect(() => {
    if (page >= 0) {
      getComment();
    }
  }, [page, getComment]);

  const handleClick = async () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Dialog
      open={openAddComment}
      fullWidth={true}
      onClose={() => {
        setOpenAddComment(false);
      }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenAddComment(false);
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
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{ mt: 3, fontSize: "1rem", fontWeight: "bold" }}
          >
            댓글 목록
          </DialogContentText>
        </DialogContent>
      </DialogTitle>
      <Box
        sx={{ px: 3 }}
        onSubmit={postComment}
        component="form"
        autoComplete="off"
        noValidate
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-comment">
            댓글 달기...
          </InputLabel>

          <Input
            value={comment}
            id="standard-adornment-comment"
            onChange={(e) => setComment(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button type="submit">게시</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ pt: 2 }}>
        {contentList?.map((content, i) => {
          return (
            <CommunityComment
              key={i}
              content={content}
              setContentList={setContentList}
              setPage={setPage}
              contentList={contentList}
            />
          );
        })}
      </Box>
      <Box display="flex" sx={{ justifyContent: "center", pb: 1 }}>
        {isLoading ? (
          <Box>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <IconButton
            onClick={handleClick}
            sx={{
              color: "#212121",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#212121",
              },
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Box>
    </Dialog>
  );
};

export default CommunityCommentModal;
