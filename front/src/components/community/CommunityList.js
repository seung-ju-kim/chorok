import React, { useEffect, useState } from "react";
import { Grid, IconButton, Skeleton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";

const CommunityList = ({ getList, boards, setBoards }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getList();
    setIsLoading(false);
  }, []);

  return (
    <Grid container rowSpacing={5} columnSpacing={3} sx={{ my: 2 }}>
      {isLoading ? (
        Array(10)
          .fill(1)
          .map((e, i) => {
            return (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
            );
          })
      ) : (
        <>
          {boards.map((board, i) => {
            return (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <CommunityCard board={board} />
              </Grid>
            );
          })}
        </>
      )}

      <IconButton
        sx={{
          position: "fixed",
          bottom: "12%",
          right: "5%",
          bgcolor: "white",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          p: 3,
          ":hover": {
            bgcolor: "white",
          },
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
