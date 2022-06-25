import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Button,
  TextField,
  List,
  ListItemText,
  Box,
  Typography,
  Grid,
  Input,
  Menu,
  MenuItem,
  IconButton,
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

const CommunityComment = ({
  content,
  setContent,
  setContentList,
  getComment,
}) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const commentedTime = content.createdAt;
  console.log(commentedTime);
  const open = Boolean(anchorEl);
  const anchorClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const anchorClose = () => {
    setAnchorEl(null);
  };
  const deleteComment = async () => {
    await Api.delete(`comments/${content._id}`);
    const res = await Api.get(`comments/${id}`);
    setContentList(res.data.comment);
    getComment();
  };

  const editComment = async (id, inputText) => {
    await Api.put(`comments/${content._id}`, {
      content,
    });
  };

  return (
    <List
      sx={{
        px: 3,
        display: "flex",
      }}
    >
      {!isEditing ? (
        <>
          <Box sx={{ display: "flex", mr: 5 }}>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                {content.author}
              </Typography>
              <Typography sx={{ fontWeight: "light", fontSize: "small" }}>
                <TimeCheck commentedTime={commentedTime} />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ mr: 5 }}>{content.content}</Typography>
          </Box>
          {userState.user.id === content.userId && (
            <Box>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={deleteComment}
              >
                <DeleteIcon
                  sx={{
                    fontSize: 15,
                    mr: 2,
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
        </>
      ) : (
        <>
          <TextField onChange={(e) => setContent(e.target.value)}></TextField>
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
    </List>
  );
};

export default CommunityComment;
