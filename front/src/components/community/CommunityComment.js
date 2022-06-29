import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  TextField,
  List,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import * as Api from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { UserStateContext } from "../../App";
import TimeCheck from "./../../element/TimeCheck";
import { textAlign } from "@mui/system";
import { useParams } from "react-router-dom";

const CommunityComment = ({ content, setContentList, getComment }) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const commentedTime = content.createdAt;

  const open = Boolean(anchorEl);
  const anchorClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const anchorClose = () => {
    setAnchorEl(null);
  };
  const deleteComment = async () => {
    await Api.delete(`comments/${content._id}`);

    getComment();
  };

  const editComment = async () => {
    await Api.put(`comments/${content._id}`, {
      content: comment,
    });
    getComment();
  };

  useEffect(() => {
    setComment(content.content);
  }, []);
  return (
    <>
      {!isEditing ? (
        <Box sx={{ px: 3 }}>
          <Box display="flex">
            <Box sx={{ fontWeight: "bold", pr: 2 }}>
              <Box>{content.author}</Box>
            </Box>
            <Box sx={{ fontSize: 13, pt: 0.5 }}>
              <Box>{content.content}</Box>
            </Box>
          </Box>
          <Box display="flex">
            <Box sx={{ fontSize: "small", my: 1, mr: 0.5 }}>
              <TimeCheck commentedTime={commentedTime} />
            </Box>
            {userState.user.id === content.userId && (
              <Box sx={{ pt: 0.2 }}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={deleteComment}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: 15,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon
                    sx={{
                      fontSize: 15,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextField>
          <Button
            onClick={() => {
              editComment();
              setIsEditing(false);
            }}
          >
            확인
          </Button>
        </>
      )}
    </>
  );
};

export default CommunityComment;
