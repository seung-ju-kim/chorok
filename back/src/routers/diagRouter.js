import { Router } from "express";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import axios from "axios";

const diagRouter = Router();

diagRouter.post("/test",
  s3Upload(),
  async (req, res, next) => {
    try {
      const { key } = req.file;
      const fileName = String(key).split("diag_img/")[1];

      const result = await axios.post(`http://localhost:8000/test/${fileName}`);
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  });

export { diagRouter };
