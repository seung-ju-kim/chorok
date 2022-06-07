import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import RegisterForm from "../components/user/RegisterForm";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const Registerpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        sx={{ color: "black", mt: 3 }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <RegisterForm />
    </>
  );
};

export default Registerpage;
