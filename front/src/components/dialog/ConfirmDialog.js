import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const ConfirmDialog = ({
  openModal,
  setOpenModal,
  handleEvent,
  title,
  subTitle,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 4,
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subTitle}
          </Typography>
          <Box sx={{ mt: 5 }} textAlign="right">
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
                ":hover": {
                  color: "white",
                  bgcolor: "#64a68a",
                },
                mr: 1,
              }}
              color="success"
              variant="contained"
              onClick={handleEvent}
            >
              확인
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: "#64a68a",
                ":hover": {
                  color: "white",
                  bgcolor: "#64a68a",
                },
              }}
              color="success"
              variant="contained"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConfirmDialog;
