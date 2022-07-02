import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";

import DiagnosisDialog from "./DiagnosisDialog";

const Diagnosis = () => {
  // 진단 팁 상태관리
  const [openDiagnosisDialog, setOpenDiagnosisDialog] = useState(false);

  // style
  const buttonStyle = {
    mt: 3,
    border: "0",
    bgcolor: "#64a68a",
    color: "white",
    ":hover": {
      bgcolor: "#64a68a",
      color: "white",
    },
  };
  return (
    <>
      <Grid item xs={12} textAlign="center" sx={{ py: 10, mt: 20 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          아이가 아픈가요?
        </Typography>
        <Typography>식물 잎을 촬영하고 진단 결과를 받아보세요.</Typography>
        <Button
          color="success"
          variant="outlined"
          size="large"
          sx={buttonStyle}
          onClick={() => {
            setOpenDiagnosisDialog(true);
          }}
        >
          진단하러 가기
        </Button>
      </Grid>
      <DiagnosisDialog
        openDiagnosisDialog={openDiagnosisDialog}
        setOpenDiagnosisDialog={setOpenDiagnosisDialog}
      />
    </>
  );
};

export default Diagnosis;
