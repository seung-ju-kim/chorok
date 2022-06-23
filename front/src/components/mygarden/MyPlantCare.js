import React, { useState, useEffect } from "react";
import {
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
  Skeleton,
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
  const [plants, setPlants] = useState({});
  const [isLoading, setIsLoading] = useState(Boolean);

  // 식물 카드 메뉴 상태 관리
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // 오늘 날짜
  const today = dayjs();

  // useParams, useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // params를 통해 식물 정보 불러오기
  useEffect(() => {
    setIsLoading(true);
    Api.get(`plants/${id}`).then((res) => {
      setPlants(res.data.plant);
      setIsLoading(false);
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
      <Card sx={{ mt: 5 }}>
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
                    handleClose();
                  }}
                >
                  <Button fullWidth color="success">
                    수정하기
                  </Button>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenModal(true);
                    handleClose();
                  }}
                >
                  <Button color="warning">삭제하기</Button>
                </MenuItem>
              </Menu>
            </>
          }
        />
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="300px" />
        ) : (
          <CardMedia
            component="img"
            src={plants.imageURL}
            sx={{
              width: "100%",
              height: "30vh",
              cursor: "pointer",
              objectFit: "cover",
            }}
            onClick={() => {
              setOpenImageEditModal(true);
            }}
          />
        )}

        <CardContent>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="20%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </>
          ) : (
            <>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={`${
                    dayjs(today).diff(plants.createdAt?.split("T")[0], "day") +
                    1
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
              <Typography variant="h6" sx={{ mt: 1 }}>
                {plants.nickname}
              </Typography>
              <Typography paragraph sx={{ mt: 1 }}>
                {plants.description}
              </Typography>
            </>
          )}
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
