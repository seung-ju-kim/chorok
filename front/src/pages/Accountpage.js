import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountForm from "../components/user/AccountForm";
import AccountEditModal from "../components/user/AccountEditModal";
import AccountWithdrwalModal from "../components/user/AccountWithdrwalModal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Accountpage = () => {
  // modal 관리
  const [openLogin, setOpenLogin] = useState(false);
  const [openWithdrawl, setOpenWithdrawl] = useState(false);
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
      <AccountForm
        setOpenLogin={setOpenLogin}
        setOpenWithdrawl={setOpenWithdrawl}
      />
      <AccountEditModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <AccountWithdrwalModal
        openWithdrawl={openWithdrawl}
        setOpenWithdrawl={setOpenWithdrawl}
      />
    </Box>
  );
};

export default Accountpage;
