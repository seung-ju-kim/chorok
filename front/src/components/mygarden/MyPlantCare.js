import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";

import * as Api from "../../api";
import ConfirmDialog from "../dialog/ConfirmDialog";
import MyPlantEditModal from "./MyPlantEditModal";
import MyPlantImageEditModal from "./MyPlantImageEditModal";
import dayjs from "dayjs";

const MyPlantCare = () => {
  // 식물 정보와 모달창 상태 관리
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageEditModal, setOpenImageEditModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [plants, setPlants] = useState({
    imageURL: "",
    description: "",
    nickname: "",
    termWater: "",
    createdAt: "",
  });
  const today = dayjs();

  // useParams, useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // params를 통해 식물 정보 불러오기
  useEffect(() => {
    Api.get(`plants/${id}`).then((res) => {
      setPlants(res.data.plant);
    });
  }, [id]);

  // 식물 삭제
  const handleDelete = () => {
    Api.delete(`plants/${id}`);
    navigate("/mygarden");
  };

  // 카드 메뉴 관리
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ height: "70vh" }}>
        <CardHeader
          title={
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          }
          action={
            <>
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    setOpenEditModal(true);
                  }}
                >
                  <Button fullWidth color="success">
                    수정하기
                  </Button>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <Button color="warning">삭제하기</Button>
                </MenuItem>
              </Menu>
            </>
          }
        />

        <CardMedia
          component="img"
          src={plants.imageURL}
          sx={{
            width: "100%",
            height: "30vh",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenImageEditModal(true);
          }}
        />
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Chip
              label={`${
                dayjs(today).diff(plants.createdAt?.split("T")[0], "day") + 1
              }일`}
              icon={
                <FavoriteIcon
                  fontSize="small"
                  sx={{ "&&": { color: "red" } }}
                />
              }
              variant="outlined"
            />
            <Chip label={plants.species} variant="outlined" />
          </Stack>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {plants.nickname}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {plants.description}
          </Typography>
        </CardContent>
      </Card>
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
    </>
  );
};

export default MyPlantCare;
