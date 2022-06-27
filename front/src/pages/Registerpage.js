import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import RegisterForm from "../components/user/RegisterForm";

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
      </Grid>
      <RegisterForm />
    </>
  );
};

export default Registerpage;
