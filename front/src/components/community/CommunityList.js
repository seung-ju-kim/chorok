import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Skeleton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Loading from "../Loading";
import CommunityCard from "./CommunityCard";

const CommunityList = ({ getList, boards, setBoards }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [preventRef, setPreventRef] = useState(true); //중복 실행 방지
  const [endRef, setEndRef] = useState(false); //모든 글 로드 확인
  const [isLoading, setIsLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const obsRef = useRef(null); //observer Element

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, {
      threshold: 0.5,
      rootMargin: "15%",
    });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef && target.isIntersecting && preventRef) {
      setPreventRef(false); //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    if (page >= 0) {
      getPost();
    }
  }, [page]);

  // 커뮤니티 리스트 불러오기
  const getPost = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작
    // ---- Get Data Code ---

    const res = await getList(page, 6);

    if (res.posts) {
      if (res.posts.end) {
        //마지막 페이지일 경우
        setEndRef(true);
      }
      setBoards((prev) => [...prev, ...res.posts]);

      setPreventRef(true);
    } else {
      console.log(res);
    }
    setLoad(false); //로딩 종료
    setIsLoading(false);
  }, [page]);

  return (
    <Grid container rowSpacing={5} columnSpacing={3} sx={{ my: 2 }}>
      {isLoading ? (
        Array(10)
          .fill(1)
          .map((e, i) => {
            return (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Skeleton animation="wave" variant="rectangular" height={400} />
              </Grid>
            );
          })
      ) : (
        <>
          {boards.map((board, i) => {
            return (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <CommunityCard board={board} />
              </Grid>
            );
          })}
        </>
      )}
      <IconButton
        sx={{
          position: "fixed",
          bottom: "12%",
          right: "5%",
          bgcolor: "white",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          p: 3,
          ":hover": {
            bgcolor: "white",
          },
        }}
        onClick={() => {
          navigate("/community/posting");
        }}
      >
        <CreateIcon />
      </IconButton>
      <div ref={obsRef}></div>
      {load && <Loading />}
    </Grid>
  );
};

export default CommunityList;
