import React from "react";
import { Grid, Button } from "@mui/material";

import MyGardenCard from "./MyGardenCard";

const dummyData = [
  {
    name: "쑥쑥이",
    img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
  },
  {
    name: "다육이",
    img: "http://www.foodnmed.com/news/photo/201907/18729_4420_594.jpg",
  },
  {
    name: "고무나무",
    img: "https://img.marieclairekorea.com/2021/04/mck_60657bd4d3c01.jpg",
  },
  {
    name: "쑥쑥이2",
    img: "https://www.hdec.kr/FileContents/EditorImg/20220308/20200331_7447_650.jpg",
  },
];
const MyGardenCardList = () => {
  return (
    <>
      {dummyData.map((data, i) => {
        return <MyGardenCard data={data} />;
      })}
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{ zIndex: -1, p: 3, bgcolor: "white", color: "black" }}
        >
          +
        </Button>
      </Grid>
    </>
  );
};

export default MyGardenCardList;
