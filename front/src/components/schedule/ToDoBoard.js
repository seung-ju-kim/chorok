import { Box, Typography } from "@mui/material";

function ToDoBoard() {
  const wrapper = {
    mt: 12,
  };
  const topBar = {
    height: "5vh",
    width: "100vw",
  };
  const main = {
    heigth: "100vh",
  };
  return (
    <Box sx={wrapper}>
      <Box sx={topBar}>
        <Typography variant="h6" fontWeight="bold">
          오늘 할 일
        </Typography>
      </Box>
      <Box component="main" sx={main}>
        <Box component="section"></Box>
      </Box>
    </Box>
  );
}

export default ToDoBoard;
