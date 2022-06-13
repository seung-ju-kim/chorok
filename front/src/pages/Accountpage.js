import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import AccountForm from "../components/user/AccountForm";
import AccountEditModal from "../components/user/AccountEditModal";
import AccountWithdrwalModal from "../components/user/AccountWithdrwalModal";

const Accountpage = () => {
  // modal 관리
  const [openLogin, setOpenLogin] = useState(false);
  const [openWithdrawl, setOpenWithdrawl] = useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 10 }}>
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
