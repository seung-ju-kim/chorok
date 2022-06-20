import React from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Box,
  DialogContent,
  Grid,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import goodCase from "../../imgs/goodCase.png";
import manySpecies from "../../imgs/manySpecies.png";
import tooFar from "../../imgs/tooFar.jpg";
import filtered from "../../imgs/filtered.png";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DiagnosisDialog = ({ openDiagnosisDialog, setOpenDiagnosisDialog }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenDiagnosisDialog(false);
    navigate("/diagnosis/picture");
  };
  return (
    <Dialog
      fullScreen
      open={openDiagnosisDialog}
      onClose={() => {
        setOpenDiagnosisDialog(false);
      }}
      fullWidth
    >
      <DialogTitle sx={{ pt: 5, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDiagnosisDialog(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box>
        <DialogContent sx={{ pb: 15 }}>
          <Box textAlign="center" sx={{ mb: 5 }}>
            <Typography variant="h4">촬영 팁</Typography>
          </Box>
          <Grid container columnSpacing={1} rowSpacing={3}>
            <Grid item xs={12} sx={{ mx: "auto", textAlign: "center" }}>
              <Box
                component="img"
                src={goodCase}
                width="50%"
                height="auto"
                sx={{ display: "block", mx: "auto", borderRadius: "50%" }}
              />
              <IconButton>
                <ExpandCircleDownOutlinedIcon sx={{ color: "green" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  적당한 거리
                </Typography>
              </IconButton>
            </Grid>

            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box
                component="img"
                src={filtered}
                width="100%"
                height="100%"
                sx={{ borderRadius: "50%" }}
              />
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  색 변조 X
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box
                component="img"
                src={tooFar}
                width="100%"
                height="100%"
                sx={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  먼 거리
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box
                component="img"
                src={manySpecies}
                width="100%"
                height="100%"
                sx={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  다양한 종
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 10, mb: 10 }}>
          <Button
            color="success"
            variant="contained"
            size="large"
            sx={{
              mx: "auto",
              bgcolor: "#64a68a",
              color: "white",
              "&:hover": { bgcolor: "#64a68a", color: "white" },
            }}
            fullWidth
            onClick={handleClick}
          >
            계속
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiagnosisDialog;
