import { Router } from "express";
import { diagService } from "../services/diagService";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import axios from "axios";

const diagRouter = Router();

diagRouter.post("/",
  s3Upload(),
  async (req, res, next) => {
    try {
      const { key } = req.file;
      const fileName = String(key).split("diag_img/")[1];

      const diseaseName = await axios.post(`http://localhost:8000/test/${fileName}`);
      const disease = await diagService.getDisease(diseaseName);
      res.status(200).json(disease);
    } catch (error) {
      next(error);
    }
  });

export { diagRouter };
