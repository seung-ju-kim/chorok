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

import correct from "../../imgs/correct.jpg";
import manySpecies from "../../imgs/manySpecies.jpg";
import tooFar from "../../imgs/tooFar.jpg";
import filtered from "../../imgs/filtered.jpg";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DiagnosisDialog = ({ openDiagnosisDialog, setOpenDiagnosisDialog }) => {
  const navigate = useNavigate();

  // 진단 페이지로 이동
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
      sx={{ maxWidth: "600px", mx: "auto" }}
    >
      <DialogTitle sx={{ bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDiagnosisDialog(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[1000],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box>
        <DialogContent sx={{ pb: 10 }}>
          <Box textAlign="center" sx={{ mb: 3 }}>
            <Typography variant="h4">촬영 팁</Typography>
          </Box>
          <Grid container columnSpacing={1} rowSpacing={3}>
            <Grid item xs={10} sx={{ mx: "auto", textAlign: "center", mb: 4 }}>
              <Box component="picture">
                <Box
                  component="source"
                  type="image/webp"
                  srcset="correct.webp"
                />
                <Box component="source" type="image/jpg" srcset="correct.jpg" />
                <Box
                  component="img"
                  src={correct}
                  width="50%"
                  height="100%"
                  sx={{ display: "block", mx: "auto", borderRadius: "50%" }}
                />
              </Box>
              <IconButton>
                <ExpandCircleDownOutlinedIcon sx={{ color: "green" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  잎 한장
                </Typography>
              </IconButton>
            </Grid>

            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box component="picture">
                <Box
                  component="source"
                  type="image/webp"
                  srcset="filtered.webp"
                />
                <Box
                  component="source"
                  type="image/jpg"
                  srcset="filtered.jpg"
                />
                <Box
                  component="img"
                  src={filtered}
                  width="100%"
                  height="100%"
                  sx={{ display: "block", mx: "auto", borderRadius: "50%" }}
                />
              </Box>
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  색 변조X
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box component="picture">
                <Box
                  component="source"
                  type="image/webp"
                  srcset="tooFar.webp"
                />
                <Box component="source" type="image/jpg" srcset="tooFar.jpg" />
                <Box
                  component="img"
                  src={tooFar}
                  width="100%"
                  height="100%"
                  sx={{ display: "block", mx: "auto", borderRadius: "50%" }}
                />
              </Box>
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  잎 여러장
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} sx={{ mx: "auto", textAlign: "center" }}>
              <Box component="picture">
                <Box
                  component="source"
                  type="image/webp"
                  srcset="manySpecies.webp"
                />
                <Box
                  component="source"
                  type="image/jpg"
                  srcset="manySpecies.jpg"
                />
                <Box
                  component="img"
                  src={manySpecies}
                  width="100%"
                  height="100%"
                  sx={{ display: "block", mx: "auto", borderRadius: "50%" }}
                />
              </Box>
              <IconButton>
                <CancelOutlinedIcon sx={{ color: "red" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  다양한 종
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 10 }}>
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
