import { Router } from express;
import { gardenService } from "../services/gardenService";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import {login_required} from "../middlewares/login_required";

const gardenRouter = Router();

/**
 * garden(plant) 생성
 */
gardenRouter.post(
  "/gardens",
  login_required,
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const userId = req.currentUserId

      //유저가 입력한 request body값
      const {species, nickname, imageURL, lastWater, termWater} = req.body;

      const newGarden = await gardenService.addGarden({
        userId,
        species, 
        nickname, 
        imageURL, 
        lastWater, 
        termWater
      })

      const body = {
        success: true,
        garden: newGarden,
      };

      res.status(201).json(body);

    } catch(error) {
      next(error);
    }
  }
)


/**
 * garden(plant) 이미지 업로드
 */
gardenRouter.post(
  "/image",
  login_required,
  s3Upload(),
  async (req, res, next) => {
    try{
      const uploadFile = req.file;
      const fileName = String(uploadFile.key).split("img/")[1];
      
      if (!uploadFile){
        return res.status(400).json({
          success: false,
          message: "업로드 실패"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "업로드 성공",
          imageURL : uploadFile.location,
          fileName : fileName
        });
      };

    } catch(error) {
      next(error);
    }
  }
)

/**
 * garden(plant) 상세 조회 
 */


/**
 * garden(plant) 목록 조회 
 */

/**
 * garden(plant) 삭제 
 */

export {gardenRouter};