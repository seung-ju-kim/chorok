import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import CommunityInfo from "./CommunityInfo";
import CommunityFree from "./CommunityFree";
import CommunityFreeComment from "./CommunityFreeComment";

const CommunityMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container direction="column" justifyContent="space around">
        <Grid
          container
          sx={{ px: 3 }}
          columnSpacing={1}
          justifyContent="space-around"
        >
          <Typography fontWeight="bold" fontSize="7vw">
            정보공유 게시판
          </Typography>
          <Button
            onClick={() => {
              navigate(`./CommunityInfoList`);
            }}
          >
            <ListIcon />
          </Button>
        </Grid>
        <Grid>
          <CommunityInfo />
        </Grid>

        <Grid
          container
          sx={{ px: 3 }}
          columnSpacing={1}
          justifyContent="space-around"
        >
          <Typography fontWeight="bold" fontSize="7vw">
            자유 게시판
          </Typography>
          <Button
            onClick={() => {
              navigate(`./CommunityFreeList`);
            }}
          >
            <ListIcon />
          </Button>
        </Grid>
        <Grid>
          <CommunityFree />
        </Grid>
      </Grid>
    </>
  );
};

export default CommunityMain;
