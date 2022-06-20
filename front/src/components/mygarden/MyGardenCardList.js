import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyGardenCard from "./MyGardenCard";
import MyPlantAddModal from "./MyPlantAddModal";
import * as Api from "../../api";

const MyGardenCardList = () => {
  // 나의 식물 상태관리
  const [myPlants, setMyPlants] = useState([]);
  const [openAddPlant, setOpenAddPlant] = useState(false);

  // 나의 식물 리스트 받아오기
  useEffect(() => {
    Api.get("plants").then((res) => {
      setMyPlants(res.data.plants);
    });
  }, []);

  // style
  const addButtonStyle = {
    position: "fixed",
    right: "5%",
    bottom: "15%",
    fontSize: "3rem",
    color: "#64a68a",
    borderRadius: "10%",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
    bgcolor: "white",
    p: 2,
    cursor: "pointer",
  };

  return (
    <>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography>{myPlants.length}개의 식물을 키우고 있습니다.</Typography>
      </Grid>
      {myPlants.length === 0 ? (
        <Grid item xs={12}>
          <Button
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              color: "#64a68a",
              display: "flex",
              height: "60vh",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setOpenAddPlant(true);
            }}
          >
            <AddIcon sx={{ mb: 3 }} />
            <Box>
              <Typography variant="h5">식물을 추가해주세요.</Typography>
            </Box>
          </Button>
        </Grid>
      ) : (
        <>
          {myPlants.map((myplant, i) => {
            return <MyGardenCard key={i} myplant={myplant} />;
          })}
          <Button
            sx={addButtonStyle}
            onClick={() => {
              setOpenAddPlant(true);
            }}
          >
            <AddIcon />
          </Button>
        </>
      )}
      <MyPlantAddModal
        openAddPlant={openAddPlant}
        setOpenAddPlant={setOpenAddPlant}
        setMyPlants={setMyPlants}
      />
    </>
  );
};

export default MyGardenCardList;
