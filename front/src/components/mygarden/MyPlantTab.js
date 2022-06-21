import React, { useState, useEffect } from "react";
import { Box, IconButton, Button, Typography, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import * as Api from "../../api";
import ConfirmDialog from "../dialog/ConfirmDialog";
import MyPlantEditModal from "./MyPlantEditModal";
import MyPlantImageEditModal from "./MyPlantImageEditModal";

const CareTab = () => {
  // 식물 정보와 모달창 상태 관리
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageEditModal, setOpenImageEditModal] = useState(false);
  const [plants, setPlants] = useState({});

  // useParams, useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // params를 통해 식물 정보 불러오기
  useEffect(() => {
    Api.get(`plants/${id}`).then((res) => setPlants(res.data.plant));
  }, [id]);

  // 식물 삭제
  const handleDelete = () => {
    Api.delete(`plants/${id}`);
    navigate("/mygarden");
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
        <Box
          component="img"
          src={plants.imageURL}
          sx={{
            width: "100%",
            height: "40vh",
            maxWidth: "300px",
            maxHeight: "300px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenImageEditModal(true);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
          {plants.nickname}
        </Typography>
        <Typography textAlign="center">
          {plants.species} | {plants.createdAt?.split("T")[0]} 입양
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              setOpenEditModal(true);
            }}
            sx={{ mr: 2 }}
          >
            수정하기
          </Button>

          <Button
            color="warning"
            variant="outlined"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            삭제하기
          </Button>
        </Box>
      </Grid>
      <MyPlantImageEditModal
        plants={plants}
        setPlants={setPlants}
        openImageEditModal={openImageEditModal}
        setOpenImageEditModal={setOpenImageEditModal}
      />
      <MyPlantEditModal
        plants={plants}
        setPlants={setPlants}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
      <ConfirmDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleEvent={handleDelete}
        title="식물 삭제"
        subTitle="식물과 작별하시겠습니까?"
      />
    </Grid>
  );
};

export default CareTab;
