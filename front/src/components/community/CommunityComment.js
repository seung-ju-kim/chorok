import React, { useContext, useState, useEffect } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import TimeCheck from "../element/TimeCheck";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { TextField, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const CommunityComment = ({
  contentList,
  content,
  setContentList,
  setPage,
}) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);
  const commentedTime = content.createdAt;

  // 스낵바
  const { enqueueSnackbar } = useSnackbar();
  const styleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  const deleteComment = async () => {
    await Api.delete(`comments/${content._id}`);
    const res = await Api.get(`comments?postId=${id}&page=1&perPage=15`);
    setPage(1);
    setContentList(res.data.comments);
  };

  const editComment = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`comments/${content._id}`, {
        content: comment,
      });
      const res = await Api.get(`comments?postId=${id}&page=1&perPage=15`);
      setPage(1);
      setContentList(res.data.comments);
      setIsEditing(false);
      setComment("");
    } catch (e) {
      const errorMessage = e.response.data;
      styleSnackbar(errorMessage, "warning");
    }
  };

  useEffect(() => {
    setComment(content.content);
  }, [contentList]);
  return (
    <>
      {!isEditing ? (
        <Box sx={{ px: 3, pb: 1 }}>
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
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#212121",
                    },
                  }}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#212121",
                    },
                  }}
                >
                  <EditIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ px: 3, alignItems: "center", display: "flex" }}
          component="form"
          onSubmit={editComment}
        >
          <TextField
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            edge="end"
            aria-label="check"
            type="submit"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: "#212121",
              },
            }}
          >
            <CheckIcon sx={{ fontSize: 15 }} />
          </IconButton>
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsEditing(false);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: "#212121",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default CommunityComment;
