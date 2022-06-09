import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import AccountForm from "../components/user/AccountForm";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const Accountpage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: 1 }}>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        sx={{ color: "black", mt: 2 }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <AccountForm />
    </Box>
  );
};

export default Accountpage;
