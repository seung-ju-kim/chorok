import React from "react";
import { Grid } from "@mui/material";
import CommunityFreeCard from "./CommunityFreeCard";

const dummyData = [
    {
      id: 1,
      name: "쑥쑥이",
      img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
    },
    {
      id: 2,
      name: "다육이",
      img: "http://www.foodnmed.com/news/photo/201907/18729_4420_594.jpg",
    },
    {
      id: 3,
      name: "고무나무",
      img: "https://img.marieclairekorea.com/2021/04/mck_60657bd4d3c01.jpg",
    },
    {
      id: 4,
      name: "쑥쑥이2",
      img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
    },
    {
      id: 5,
      name: "쑥쑥이2",
      img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
    },
    {
      id: 6,
      name: "쑥쑥이2",
      img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
    },
  ];

const CommunityFree = () => {
  const cardListStyle1 = {
    width: "100%",
    height: "100%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  const cardListStyle2 = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
    bgcolor: "#64a68a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
          {dummyData.map((data, i) => {
              return <CommunityFreeCard key={i} data={data} />;
          })}
      </Grid>
    </>
  )
}

export default CommunityFree;