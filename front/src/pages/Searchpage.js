import React from "react";
import { Box } from "@mui/material";
import SearchCardList from "../components/search/SearchCardList";
import SearchBar from "../components/search/SearchBar";
import PopularPlants from "../components/search/PopularPlants";
function Searchpage() {
  return (
    <Box sx={{ my: 10 }}>
      <SearchBar />
      <PopularPlants />
      <SearchCardList />
    </Box>
  );
}

export default Searchpage;
