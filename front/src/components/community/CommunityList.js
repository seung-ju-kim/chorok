import React, { useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";

const CommunityList = ({ getList, boards, setBoards }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getList();
  }, []);

  return (
    <Grid container rowSpacing={1} sx={{ mt: 8, mb: 2 }}>
      {boards.map((board, i) => {
        return (
          <Grid item xs={12} key={i}>
            <CommunityCard board={board} />
          </Grid>
        );
      })}
      <IconButton
        sx={{
          position: "fixed",
          bottom: "12%",
          right: "5%",
          bgcolor: "white",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          p: 3,
        }}
        onClick={() => {
          navigate("/community/posting");
        }}
      >
        <CreateIcon />
      </IconButton>
    </Grid>
  );
};

export default CommunityList;
