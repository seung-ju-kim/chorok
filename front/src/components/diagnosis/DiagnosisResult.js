import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DiagnosisResult = ({ result, openResult, setOpenResult }) => {
  return (
    <Dialog
      fullScreen
      open={openResult}
      onClose={() => {
        setOpenResult(false);
      }}
      fullWidth
    >
      <DialogTitle sx={{ pt: 5, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenResult(false);
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
        <DialogContent>
          <Box component="img" width="100%" src={result.imageURL} />
          {result.diseaseList[0]?.korean === "정상" ? (
            <Typography variant="h6">
              AI 의사가 당신의 식물을 진단하였습니다. 당신의 식물은 정상입니다.
            </Typography>
          ) : (
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Typography>
                  AI 의사가 당신의 식물을 진단하였습니다. 당신의 식물은{" "}
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontFamily="CookieRun-Regular"
                  >
                    {result.diseaseList[0]?.percent}%
                  </Typography>{" "}
                  확률로{" "}
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontFamily="CookieRun-Regular"
                  >
                    {result.diseaseList[0]?.korean}
                  </Typography>
                  입니다.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontFamily="CookieRun-Regular"
                  >
                    {result.diseaseList[0]?.korean}
                  </Typography>
                  이란? {result.diseaseList[0]?.symptom}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Typography> 관리법</Typography> :{" "}
                  {result.diseaseList[0]?.solution}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 10, py: 5 }}>
          <Button
            onClick={() => {
              setOpenResult(false);
            }}
            color="success"
            variant="contained"
            sx={{
              mx: "auto",
              bgcolor: "#64a68a",
              color: "white",
              "&:hover": { bgcolor: "#64a68a", color: "white" },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiagnosisResult;
