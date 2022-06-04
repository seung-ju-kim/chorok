import React from "react";
import SearchCardItem from "./SearchCardItem";
import { Grid } from "@mui/material";

function SearchCardList() {
  const cards = [
    { name: "test1" },
    { name: "test2" },
    { name: "test3" },
    { name: "test4" },
    { name: "test5" },
    { name: "test6" },
    { name: "test7" },
    { name: "test8" },
    { name: "test9" },
    { name: "test10" },
  ];
  return (
    <Grid container spacing={3} sx={{ px: 3 }}>
      {cards.map((card, i) => {
        return (
          <Grid item xs={4} key={i}>
            <SearchCardItem card={card} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SearchCardList;
