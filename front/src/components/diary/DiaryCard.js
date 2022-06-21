import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import ConfirmDialog from "../dialog/ConfirmDialog";
import * as Api from "../../api";

const DiaryCard = ({ diary, setDiaries }) => {
  // 모달창 상태관리
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const today = new Date();

  const { id } = useParams();
  const navigate = useNavigate();

  // 카드 메뉴 관리
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await Api.delete(`diary/${id}`);
    const res = await Api.get("diary");
    setDiaries(res.data);
    setOpenModal(false);
  };

  // style
  const cardStyle = {
    width: "90vw",
    border: "1px solid white",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <Card sx={cardStyle}>
      {diary.img && (
        <CardMedia
          component="img"
          image={diary.img}
          alt="diary img"
          sx={{ p: 2, height: "30vh" }}
        />
      )}
      <CardContent sx={{ position: "relative" }}>
        <MoreVertOutlinedIcon
          sx={{ position: "absolute", right: 10 }}
          onClick={handleClick}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setOpenModal(true);
            }}
          >
            삭제
          </MenuItem>
        </Menu>
        <Typography gutterBottom variant="h5">
          {today.toISOString().split("T")[0]}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {diary.content}
        </Typography>
      </CardContent>
      <ConfirmDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleEvent={handleDelete}
        title="다이어리 삭제"
        subTitle="정말로 삭제하시겠습니까?"
      />
    </Card>
  );
};

export default DiaryCard;
