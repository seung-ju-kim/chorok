import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyGardenCard from "./MyGardenCard";
import MyPlantAddModal from "./MyPlantAddModal";
import * as Api from "../../api";

const MyGardenCardList = () => {
  // 상태관리
  const [myPlants, setMyPlants] = useState([]);

  useEffect(() => {
    Api.get("plants").then((res) => {
      setMyPlants(res.data.plants);
    });
  }, []);

  // modal
  const [openAddPlant, setOpenAddPlant] = useState(false);

  // style
  const addButtonStyle = {
    position: "fixed",
    right: "5%",
    bottom: "10%",
    fontSize: "5rem",
    color: "#64a68a",
    borderRadius: "50%",
    boxShadow: "0 0 15px 0 rgba(128, 128, 128, 0.372)",
    bgcolor: "white",
    p: 2,
    cursor: "pointer",
  };
  return (
    <>
      {myPlants.length === 0 ? (
        <Grid item xs={12}>
          <Box
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              display: "flex",
              height: "60vh",
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
          </Box>
        </Grid>
      ) : (
        <>
          {myPlants.map((myplant, i) => {
            return <MyGardenCard key={i} myplant={myplant} />;
          })}
          <AddIcon
            onClick={() => {
              setOpenAddPlant(true);
            }}
            sx={addButtonStyle}
          />
        </>
      )}
      <MyPlantAddModal
        openAddPlant={openAddPlant}
        setOpenAddPlant={setOpenAddPlant}
      />
    </>
  );
};

export default MyGardenCardList;
