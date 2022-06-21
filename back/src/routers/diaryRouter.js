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
      const status = req.body.status || null;

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

/**
 * 다이어리 목록 조회
 */

/**
 * 다이어리 수정
 */

/**
 * 다이어리 삭제
 */

export { diaryRouter };
