import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import * as Api from "../../api";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const CommunityCommentBox = () => {
  const { id } = useParams();

  const [contents, setContents] = useState("");

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

    const res = await Api.getComment(
      `comments/postId=${id}&page=${page}&perPage=${perPage}`
    );
    if (res.data) {
      if (res.data.end) {
        setEndRef(true);
      }
      setContents((prev) => [...prev, ...res.data]);
      setPreventRef(true);
    } else {
      console.log(res);
    }
    setLoad(false);
  }, [page]);

  const postComment = async () => {
    try {
      await Api.post(`comments`, {
        postId,
        content,
      });
      const res = await Api.getComment(
        `comments/postId=${id}&page=${page}&perPage=${perPage}`
      );
      setContents("");
      getComment();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {contents.map((content, i) => {
        return (
          <Box sx={{ px: 3 }}>
            <Box key={i}>{content}</Box>
          </Box>
        );
      })}
      {load && <CircularProgress color="success" />}
      <div ref={obsRef}></div>
    </>
  );
};

export default CommunityCommentBox;
