import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { axios } from "axios";
import ToDo from "../components/schedule/ToDo";
import Header from "./../components/Header";

function Schedule() {
  return (
    <>
      <ToDo />
    </>
  );
}

export default Schedule;
