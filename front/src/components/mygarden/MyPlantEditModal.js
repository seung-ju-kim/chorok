import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

import "./react-datepicker.css";
import * as Api from "../../api";

const MyPlantEditModal = ({
  plants,
  setPlants,
  openEditModal,
  setOpenEditModal,
}) => {
  const { id } = useParams();

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`plants/${id}`, {
        species: plants.species,
        nickname: plants.nickname,
        description: plants.description,
        termWater: Number(plants.termWater),
      });
      setOpenEditModal(false);
    } catch (e) {
      styleSnackbar(e.response.data, "warning");
    }
  };

  return (
    <Dialog
      open={openEditModal}
      onClose={() => {
        setOpenEditModal(false);
      }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenEditModal(false);
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
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{
              color: "#64a68a",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            내 식물 정보 수정
          </DialogContentText>
          <DialogContentText
            align="center"
            sx={{ color: "#64a68a", fontFamily: "CookieRun-Regular", mb: 3 }}
          >
            아이의 정보를 수정합니다.
          </DialogContentText>
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            type="text"
            label="식물 종류"
            fullWidth
            variant="outlined"
            color="success"
            value={plants.species}
            onChange={(e) => {
              setPlants({ ...plants, species: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="애칭"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={plants.nickname}
            onChange={(e) => {
              setPlants({ ...plants, nickname: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="한 줄 소개"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={plants.description}
            onChange={(e) => {
              setPlants({ ...plants, description: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="물 주는 주기"
            type="number"
            fullWidth
            variant="outlined"
            color="success"
            value={plants.termWater}
            onChange={(e) => {
              setPlants({ ...plants, termWater: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{
              mx: "auto",
              bgcolor: "#64a68a",
              color: "white",
              ":hover": {
                bgcolor: "#64a68a",
                color: "white",
              },
            }}
            type="submit"
            variant="contained"
            color="success"
          >
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MyPlantEditModal;
