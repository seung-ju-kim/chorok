import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import DiaryEditModal from "./DiaryEditModal";
import ConfirmDialog from "../dialog/ConfirmDialog";
import * as Api from "../../api";

const DiaryCard = ({ diary, setDiaries, isLoading }) => {
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

  return (
    <Card sx={{ mx: "auto", maxWidth: "800px" }}>
      {diary.imageURL && (
        <>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="300px"
            />
          ) : (
            <CardMedia
              component="img"
              image={diary.imageURL}
              alt="diary img"
              sx={{
                objectFit: "fill",
                height: "300px",
              }}
            />
          )}
        </>
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
        <Typography gutterBottom variant="h6">
          {diary.createdAt.split("T")[0]}
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
