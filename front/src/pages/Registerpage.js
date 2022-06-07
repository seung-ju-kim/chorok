import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import RegisterForm from "../components/user/RegisterForm";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Registerpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          sx={{ color: "black", mt: 3 }}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <Button
          onClick={() => {
            navigate(1);
          }}
          sx={{ color: "black", mt: 3, ml: "auto" }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
      <RegisterForm />
    </>
  );
};

export default Registerpage;
