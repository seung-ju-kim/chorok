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
import CommunityComment from "./CommunityComment";
import Loader from "../../element/Loader";

const CommunityCommentModal = ({ openAddComment, setOpenAddComment }) => {
  const [comment, setComment] = useState("");
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [preventRef, setPreventRef] = useState(true); //중복 실행 방지
  const obsRef = useRef(null); // observer Element
  const [endRef, setEndRef] = useState(false); //모든 글 로드 확인
  const { id } = useParams();
  const [load, setLoad] = useState(false); //로딩스피너

  useEffect(() => {
    // 감시할 타겟 요소가 뷰포트의 50%만큼 들어왔을 때 요청
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef && target.isIntersecting && preventRef) {
      setPreventRef(false);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page >= 0) {
      getComment();
    }
  }, [page]);

  const getComment = useCallback(async () => {
    //글 불러오기
    setLoad(true);
    // Get Data Code
    const res = await Api.get(`comments?postId=${id}&page=${page}&perPage=15`);
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
        content: comment,
      });

      const res = await Api.get(
        `comments?postId=${id}&page=${page}&perPage=20`
      );
      setContentList(res.data.comment);
      setComment("");
      getComment();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      postComment();
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
      <Box sx={{ px: 3 }} component="form" autoComplete="off" noValidate>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-comment">
            댓글 달기...
          </InputLabel>
          <Input
            onKeyPress={handleOnKeyPress}
            value={comment}
            id="standard-adornment-comment"
            onChange={(e) => setComment(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={postComment}>게시</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box>
        {contentList?.map((content, i) => {
          return (
            <CommunityComment
              key={i}
              content={content}
              comment={comment}
              setComment={setComment}
              setContentList={setContentList}
              getComment={getComment}
            />
          );
        })}
      </Box>
      <div ref={obsRef}></div>
      {load && <div>로딩스피너</div>}
    </Dialog>
  );
};

export default CommunityCommentModal;
