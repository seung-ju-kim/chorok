import React, { useContext, useState, useEffect } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import TimeCheck from "../element/TimeCheck";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const CommunityComment = ({ content, getComment }) => {
  const [comment, setComment] = useState("");
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

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      editComment();
      setIsEditing(false);
    }
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
          onKeyPress={handleOnKeyPress}
        >
          <TextField
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            edge="end"
            aria-label="check"
            onClick={() => {
              editComment();
              setIsEditing(false);
            }}
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
