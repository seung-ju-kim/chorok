import React, { useState } from "react";
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

import { useNavigate, useParams } from "react-router-dom";
import "./react-datepicker.css";
import * as Api from "../../api";
import defaultImg from "../../imgs/default_image.png";
import { useEffect } from "react";

const MyPlantEditModal = ({ openEditModal, setOpenEditModal }) => {
  const { id } = useParams();
  const navigate = useNavigate("/mygarden");
  // 상태 관리
  const [species, setSpecies] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [term, setTerm] = useState(null);

  useEffect(() => {
    Api.get(`plants/${id}`).then((res) => {
      setSpecies(res.data.plant.species);
      setNickname(res.data.plant.nickname);
      setDescription(res.data.plant.description);
      setTerm(res.data.plant.termWater);
    });
  }, []);

  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`plants/${id}`, {
        species,
        nickname,
        description,
        termWater: Number(term),
      });
      setOpenEditModal(false);
      navigate(`/mygarden/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
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
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="애칭"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="한 줄 소개"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="물 주는 주기"
            type="number"
            fullWidth
            variant="outlined"
            color="success"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            수정
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MyPlantEditModal;
