import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import * as Api from "../../api";
import MyPlantEditModal from "./MyPlantEditModal";

const CareTab = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    Api.delete(`plants/${id}`);
    navigate("/mygarden");
  };

  return (
    <Box>
      <List component="nav">
        <ListItem divider>
          <ListItemText
            primary="식물 정보 수정"
            secondary="식물의 정보를 변경합니다."
          />
          <Box textAlign="right">
            <Button
              color="inherit"
              onClick={() => {
                setOpenEditModal(true);
              }}
            >
              Edit
            </Button>
          </Box>
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary="식물 삭제"
            secondary="키우던 식물과 작별합니다."
          />
          <Box textAlign="right">
            <Button
              color="inherit"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Delete
            </Button>
          </Box>
        </ListItem>
      </List>
      <MyPlantEditModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
      <ConfirmModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleEvent={handleDelete}
      />
    </Box>
  );
};

export default CareTab;
