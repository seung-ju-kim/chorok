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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Typography,
  Grid,
  Input,
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserStateContext } from "../../App";

const CommunityComment = ({
  content,
  setContent,
  deleteComment,
  editComment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);
  console.log(userState);
  return (
    <Box sx={{ display: "flex", px: 3 }}>
      {!isEditing ? (
        <>
          <Box>{content.author}</Box>
          <Box>{content.content}</Box>
          {!useState.user && (
            <>
              <Button variant="text" onClick={deleteComment}>
                삭제
              </Button>
              <Button variant="text" onClick={() => setIsEditing(true)}>
                수정
              </Button>
            </>
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
    </Box>
  );
};

export default CommunityComment;
