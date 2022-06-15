import axios from "axios";
import React, { useState } from "react";
import { Box } from "@mui/material";

const DiagImg = () => {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "imgs/previewImg.png",
  });

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Box>
        <input type="file" accept="image/*" onChange={null} />
      </Box>
    </>
  );
};

export default DiagImg;
