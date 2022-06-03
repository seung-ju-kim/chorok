import React from "react";
import SearchCardItem from "./SearchCardItem";
import { Grid } from "@mui/material";
function SearchCardList() {
  return (
    <Grid container spacing={2} sx={{ px: 3 }}>
      <Grid item xs={4}>
        <SearchCardItem />
      </Grid>
      <Grid item xs={4}>
        <SearchCardItem />
      </Grid>
      <Grid item xs={4}>
        <SearchCardItem />
      </Grid>
      <Grid item xs={4}>
        <SearchCardItem />
      </Grid>
      <Grid item xs={4}>
        <SearchCardItem />
      </Grid>
    </Grid>
  );
}

export default SearchCardList;
