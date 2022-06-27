import { Router } from "express";
import { scheduleService } from "../services/scheduleService";
import { login_required } from "../middlewares/login_required";

const scheduleRouter = Router();

/**
 *  오늘 날짜의 모든 스케줄 리턴
 */
scheduleRouter.get(
  "/schedules", 
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const todaySchedules = await scheduleService.getTodaySchedules({ userId });

      res.status(200).json(todaySchedules);
    } catch (error) {
      next(error);
    }
  }
);

/**
 *   완료한 스케줄 리턴
 */
scheduleRouter.get(
  "/fulfillschedules",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const fulfillSchedules = await scheduleService.getFulfillSchedules({ userId });

      res.status(200).json(fulfillSchedules);
    } catch (error) {
      next(error);
    }
  }
);

/**
 *  예정된 스케줄 리턴
 */
scheduleRouter.get(
  "/pendingschedules",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const pendingSchedules = await scheduleService.getPendingSchedules({ userId });

      res.status(200).json(pendingSchedules);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * plant 스케줄 이행 여부 체크 및 스케줄 추가
 */
scheduleRouter.post(
  "/plants/:id/:scheduleId",
  login_required,
  async (req, res, next) => {
    try {
      const plantId = req.params.id;
      const scheduleId = req.params.scheduleId;
      const isChecked = req.body.isChecked ?? false;

      const updatedSchedulePlant = await scheduleService.checkAndUpdateSchedule({
        plantId, 
        scheduleId, 
        isChecked
      })
      res.status(200).json(updatedSchedulePlant);
    } catch (error) {
      next(error);
    }
  }
);

export { scheduleRouter };
