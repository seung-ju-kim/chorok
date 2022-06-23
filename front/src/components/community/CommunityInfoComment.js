import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import * as Api from "../../api";
import CommunityInfoCommentAddModal from "./CommunityInfoCommentAddModal";

const CommunityInfoComment = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [openAddComment, setOpenAddComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setContent(e.target.value);
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-comment">
            댓글 입력...
          </InputLabel>
          <Input
            id="standard-adornment-comment"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() => {
                    setOpenAddComment(true);
                  }}
                >
                  게시
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <CommunityInfoCommentAddModal
          openAddComment={openAddComment}
          setOpenAddComment={setOpenAddComment}
        />
      </>
    </Box>
  );
};

export default CommunityInfoComment;
