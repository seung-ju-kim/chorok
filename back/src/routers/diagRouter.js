import { Router } from "express";
import { diagService } from "../services/diagService";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import axios from "axios";

const diagRouter = Router();

diagRouter.post("/", s3Upload(), async (req, res, next) => {
  try {
    const { key } = req.file;
    const imageURL = req.file.location;
    const fileName = String(key).split("diag_img/")[1];

    const mlResponse = await axios.get(
      `http://localhost:8000/predict/${fileName}`
    );

    if(mlResponse.data=="misCategory"){
      const error = new Error("식물이 화면에 가득차도록 찍어주세요.");
      throw error;
    }else if(mlResponse.data=="misTest"){
      const error = new Error("병반이 확인되지 않습니다. 검출 환경을 지켜주세요.");
      throw error;
    }

    const diagList = mlResponse.data
    const diseaseList = []
    for (const [key, value] of Object.entries(diagList)){
      let disease = await diagService.getDisease(key);
      disease["percent"] = value >= 0.99 ? 98.8888 : value*100;
      diseaseList.push(disease);
    };

    const result = { diseaseList, imageURL };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { diagRouter };
