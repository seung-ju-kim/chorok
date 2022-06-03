import React from "react";
import { Grid, InputBase, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import camera from "../../imgs/camera.png";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F5F5F6",
  marginLeft: "5vw",
  width: "90%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  bgcolor: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

function SearchBar() {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="식물 이름을 검색하세요."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Grid>
      <Grid item xs={2}>
        <Box component="img" src={camera} />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
