import React from "react";
import { Grid, InputBase, Button, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import camera from "../../imgs/camera.png";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "15px",
  backgroundColor: "#F5F5F6",
  width: "100%",
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
  width: "100%",
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
    <Grid container sx={{ px: 3 }} spacing={1}>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography fontWeight="bold" variant="h6">
          찾으시는 식물을 검색하세요.
        </Typography>
      </Grid>
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
      <Grid item xs={2} sx={{ my: "auto" }}>
        <Button size="small" color="success" variant="outlined">
          검색
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
