import React, { useState, useEffect, useRef, useCallback } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import * as Api from "../../api";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CommunityComment from "./CommunityComment";

const CommunityCommentModal = ({ openAddComment, setOpenAddComment }) => {
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const { id } = useParams();
  const obsRef = useRef(null); //observer Element
  const [page, setPage] = useState(1); // 현재 페이지
  const [perPage, setPerPage] = useState(10);
  const [load, setLoad] = useState(false); //로딩스피너
  const [preventRef, setPreventRef] = useState(true); //중복 실행 방지
  const [endRef, setEndRef] = useState(false); //모든 글 로드 확인

  useEffect(() => {
    // threshold 0.5 -> 데이터가 50% 로딩 됐을 때 불러옴
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getComment();
  }, [page]);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false; // 옵저버 중복 실행 방지
      setPage((prev) => prev + 1);
    }
  };

  const getComment = useCallback(async () => {
    setLoad(true);

    const res = await Api.get(`comments?postId=${id}&page=&perPage=`);

    if (res.data) {
      if (res.data.end) {
        setEndRef(true);
      }

      setContentList(res.data.comments);
      setPreventRef(true);
    } else {
      console.log(res);
    }
    setLoad(false);
  }, [page]);

  const postComment = async () => {
    try {
      await Api.post(`comments`, {
        postId: id,
        content,
      });

      const res = await Api.get(`comments?postId=${id}&page=`);
      console.log(res);
      setContentList(res.data.comment);
      setContent("");
      getComment();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={openAddComment}
      fullScreen
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
          <DialogContentText align="center" sx={{ mt: 3, fontSize: "1rem" }}>
            댓글 목록
          </DialogContentText>
        </DialogContent>
        <hr />
      </DialogTitle>
      <Box>
        {contentList.map((content, i) => {
          return (
            <CommunityComment
              key={i}
              content={content}
              setContent={setContent}
              setContentList={setContentList}
              getComment={getComment}
            />
          );
        })}
        {load && <CircularProgress color="success" />}
        <div ref={obsRef}></div>
      </Box>
      <Box sx={{ px: 3 }} component="form" autoComplete="off" noValidate>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-comment">
            댓글 달기...
          </InputLabel>
          <Input
            id="standard-adornment-comment"
            onChange={(e) => setContent(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={postComment}>게시</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default CommunityCommentModal;
