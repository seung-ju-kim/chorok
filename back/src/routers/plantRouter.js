import { Router } from "express";
import { plantService } from "../services/plantService";
import { plantValidate } from "../middlewares/plantValidation";
import { login_required } from "../middlewares/login_required";




const plantRouter = Router();

/**
 * plant(plant) 생성
 */
plantRouter.post(
  "/plants", 
  login_required, 
  plantValidate.createPlant,
  async (req, res, next) => {
  try {
    //로그인한 유저의 고유id
    const userId = req.currentUserId;

    //유저가 입력한 request body값
    const { species, nickname, imageURL, description, lastWater, termWater } =
      req.body;

    const newPlant = await plantService.addPlant({
      userId,
      species,
      nickname,
      imageURL,
      description,
      lastWater,
      termWater,
    });

    const body = {
      success: true,
      plant: newPlant,
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});


/**
 * plant(plant) 상세 조회 
 */

plantRouter.get(
  "/plants/:id", 
  login_required, 
  async (req, res, next) => {
  try {
    const plantId = req.params.id;
    const plant = await plantService.getPlantById(plantId);

      const body = {
          success: true,
          plant: plant,
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * plant(plant) 목록 조회(페이징 처리)
 */
plantRouter.get(
  "/plants", 
  login_required, 
  async (req, res, next) => {
    try {
      const page = +req.query.page || 1;
      const perPage = +req.query.perPage || 10;
      const userId = req.currentUserId;

      const lastPage = await plantService.getLastPage({ userId, page, perPage });

      const plants = await plantService.getPlantsByUserId({
        userId,
        page,
        perPage,
      });

      const body = {
        success: true,
        page: page,
        lastPage: lastPage,
        plants: plants,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);



/**
 * plant(plant) 수정
 */
plantRouter.put(
  "/plants/:id", 
  login_required,
  plantValidate.updatePlant, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const plantId = req.params.id;

      const plant = await plantService.getPlantById(plantId);
      
      if(userId !== plant.userId) {
        const error = new Error("수정 권한이 없습니다.")
        throw error;
      }

      const species = req.body.species ?? null;
      const nickname = req.body.nickname ?? null;
      const imageURL = req.body.imageURL ?? null;
      const description = req.body.description ?? null;
      const termWater = req.body.termWater ?? null;

      const toUpdate = {
        species,
        nickname,
        imageURL,
        description,
        termWater,
      };

      const updatedPlant = await plantService.setPlant({ plantId, toUpdate });

      const body = {
        success: true,
        post: updatedPlant,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * plant(plant) 삭제
 */
plantRouter.delete(
  "/plants/:id", 
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const plantId = req.params.id;
      
      const plant = await plantService.getPlantById(plantId);
      
      if(userId !== plant.userId) {
        const error = new Error("삭제 권한이 없습니다.")
        throw error;
      }

      const isDeleted = await plantService.deletePlant(plantId);

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});

export { plantRouter };
