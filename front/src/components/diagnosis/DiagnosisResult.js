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
  Divider,
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
        <Typography textAlign="center" sx={{ mt: 3 }}>
          당신의 식물은{" "}
          <Typography
            variant="h6"
            component="span"
            fontWeight="bold"
            fontFamily="CookieRun-Regular"
          >
            {result.diseaseList[0]?.percent}%
          </Typography>{" "}
          확률로{" "}
          <Typography
            variant="h6"
            component="span"
            fontWeight="bold"
            fontFamily="CookieRun-Regular"
          >
            {result.diseaseList[0]?.korean}
          </Typography>
          입니다.
        </Typography>
      </DialogTitle>
      <Box>
        <DialogContent sx={{ py: 0 }}>
          <Box textAlign="center">
            <Box
              sx={{ borderRadius: "20px", my: 3, border: "2px solid gray" }}
              component="img"
              width="80%"
              src={result.imageURL}
              maxWidth="800px"
            />
          </Box>
          {result.diseaseList[0]?.korean === "정상" ? (
            <Typography variant="h5" textAlign="center" sx={{ mb: 10 }}>
              당신의 식물은 정상입니다.
            </Typography>
          ) : (
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Box sx={{ width: "100%", mt: 3 }}>
                  <Divider textAlign="left">
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight="bold"
                      fontFamily="CookieRun-Regular"
                    >
                      {result.diseaseList[0]?.korean}
                    </Typography>
                  </Divider>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>{result.diseaseList[0]?.symptom}</Typography>
                <Box sx={{ width: "100%", mt: 3 }}>
                  <Divider textAlign="left">
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight="bold"
                      fontFamily="CookieRun-Regular"
                    >
                      관리법
                    </Typography>
                  </Divider>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {result.diseaseList[0]?.mission.map((solution, i) => {
                  return (
                    <Typography key={i}>
                      {i + 1}. {solution}
                    </Typography>
                  );
                })}
              </Grid>
              <Box sx={{ width: "100%", my: 3 }}>
                <Divider />
              </Box>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ pb: 5 }}>
          <Button
            onClick={() => {
              setOpenResult(false);
            }}
            size="large"
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
