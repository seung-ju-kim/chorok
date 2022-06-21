import { Router } from "express";
import { diaryService } from "../services/diaryService";
import { login_required } from "../middlewares/login_required";

const diaryRouter = Router();

/**
 * 다이어리 생성
 */
diaryRouter.post(
  "/diaries", 
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;

      //유저가 입력한 request body값
      const { plantId, imageURL, content, date } = req.body;
      const status = req.body.status || "test";

      const newDiary = await diaryService.addDiary({
        userId,
        plantId,
        imageURL,
        content,
        date,
        status,
      });

      const body = {
      success: true,
      diary: newDiary,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * 다이어리 상세 조회
 */
diaryRouter.get(
  "/diaries/:id", 
  login_required, 
  async (req, res, next) => {
    try {
      const diaryId = req.params.id;
      const diary = await diaryService.getDiaryById(diaryId);
      
      const body = {
        success: true,
        diary: diary
      }

      res.status(200).json(body);
    } catch (error){
      next(error);
    }
  }
);

/**
 * 다이어리 목록 조회
 */
diaryRouter.get(
  "/diaries", 
  login_required, 
  async (req, res, next) => {
    try{
      const id = req.query.plantId;
      const plantId = id.split("/")[0]
      console.log(plantId);
      const diaries = await diaryService.getDiariesByPlantId(plantId);

      const body = {
        success: true,
        diaries: diaries,
      }
      res.status(200).json(body);
    }catch(error){
      next(error);
    }
  }
);
/**
 * 다이어리 수정
 */

diaryRouter.put(
  "/diaries/:id", 
  login_required,
  async (req, res, next) => {
    try{
      const diaryId = req.params.id;

      const imageURL = req.body.imageURL ?? null;
      const content = req.body.content ?? null;
      const status = req.body.status ?? null;

      const toUpdate = {
        imageURL,
        content,
        status,
      };

      const updatedDiary = await diaryService.setDiary({ diaryId, toUpdate });

      const body = {
        success: true,
        post: updatedDiary,
      };

      res.status(200).json(body);
    } catch(error) {
      next(error);
    }
  }
);

/**
 * 다이어리 삭제
 */
diaryRouter.delete(
  "/diaries/:id", 
  login_required, 
  async (req, res, next) => {
    try {
      const diaryId = req.params.id;
      const isDeleted = await diaryService.deleteDiary(diaryId);
  
      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  }
);
export { diaryRouter };
