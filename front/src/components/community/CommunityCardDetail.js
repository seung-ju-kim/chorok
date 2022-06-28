import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
import CommunityEditForm from "./CommunityEditForm";
import MenuIcon from "@mui/icons-material/Menu";
import CommunityCommentModal from "./CommunityCommentModal";

const CommunityCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Login user 정보
  const userState = useContext(UserStateContext);

  const [openAddComment, setOpenAddComment] = useState(false);
  const [board, setBoard] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // 식물 카드 메뉴 상태 관리
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // 카드 메뉴 관리
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getBoard();
  }, []);

  // 게시물 정보 불러오기
  const getBoard = async () => {
    const res = await Api.get(`posts/${id}`);
    setBoard(res.data.post);
  };

  // 게시물 삭제
  const deleteBoard = async () => {
    await Api.delete(`posts/${board._id}`);
    navigate(-1);
  };

  return (
    <Grid container sx={{ py: 12, px: "5%", mx: "auto", maxWidth: "800px" }}>
      <Grid item xs={3}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
          sx={{ color: "black" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      {board.userId === userState.user.id ? (
        <Grid item xs={9} textAlign="right">
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                setIsEditing(true);
                handleClose();
              }}
            >
              <Button fullWidth color="success">
                수정하기
              </Button>
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteBoard();
                handleClose();
              }}
            >
              <Button color="warning">삭제하기</Button>
            </MenuItem>
          </Menu>
        </Grid>
      ) : null}

      {!isEditing ? (
        <>
          <Grid item xs={12} sx={{ my: 2 }}>
            <Typography variant="h4">{board.title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize="1rem">{board.author}</Typography>
          </Grid>
          <Grid item xs={8} textAlign="right">
            <Typography fontSize="1rem">
              {board.createdAt?.split("T")[0]}{" "}
              {board.createdAt?.split("T")[1].split(".")[0]}
            </Typography>
          </Grid>
          {board.imageURL && (
            <Grid item xs={12} sx={{ mx: "auto", mt: 2 }}>
              <Box component="img" width="100%" src={board.imageURL} />
            </Grid>
          )}

          <Box sx={{ width: "100%", my: 3 }}>
            <Divider />
          </Box>
          <Grid item xs={12}>
            <Typography paragraph>{board.content}</Typography>
          </Grid>
          <Box sx={{ width: "100%", mt: 3, mb: 1 }}>
            <Divider />
          </Box>
          <CommunityCommentModal
            openAddComment={openAddComment}
            setOpenAddComment={setOpenAddComment}
          />
          <IconButton
            size="small"
            onClick={() => {
              setOpenAddComment(true);
            }}
          >
            <ChatBubbleOutlineIcon sx={{ mr: 1 }} />
            댓글
          </IconButton>
        </>
      ) : (
        <CommunityEditForm
          board={board}
          setBoard={setBoard}
          setIsEditing={setIsEditing}
        />
      )}
    </Grid>
  );
};

export default CommunityCardDetail;
