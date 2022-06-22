import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import dayjs from "dayjs";

import DiaryEditModal from "./DiaryEditModal";
import ConfirmDialog from "../dialog/ConfirmDialog";
import * as Api from "../../api";

const DiaryCard = ({ diary, setDiaries }) => {
  // 모달창 상태관리
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [content, setContent] = useState(diary.content);
  const { id } = useParams();
  // 카드 메뉴 관리
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const today = dayjs();
  // 다이어리 수정
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`diaries/${diary._id}`, {
        content,
      });

      await Api.get(`diaries?plantId=${id}`).then((res) => {
        setDiaries(res.data.diaries);
      });
      handleClose();
      setOpenEditModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  // 다이어리 삭제
  const handleDelete = async () => {
    await Api.delete(`diaries/${diary._id}`);

    await Api.get(`diaries?plantId=${id}`).then((res) => {
      setDiaries(res.data.diaries);
    });

    setOpenModal(false);
    handleClose();
  };

  // style
  const cardStyle = {
    width: "90vw",
    border: "1px solid white",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <Card sx={cardStyle}>
      {diary.imageURL && (
        <CardMedia
          component="img"
          image={diary.imageURL}
          alt="diary img"
          sx={{
            p: 2,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            maxHeight: "40vh",
          }}
        />
      )}
      <CardContent sx={{ position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 10 }}
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            수정
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenModal(true);
            }}
          >
            삭제
          </MenuItem>
        </Menu>
        <Typography gutterBottom variant="h5">
          {today.format("YYYY-MM-DD")}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {diary.content}
        </Typography>
      </CardContent>
      <DiaryEditModal
        handleEvent={handleEdit}
        content={content}
        setContent={setContent}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
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
