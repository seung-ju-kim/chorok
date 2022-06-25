import { Router } from "express";
import { plantService } from "../services/plantService";
import { Plant } from "../db";
import { login_required } from "../middlewares/login_required";
import dayjs from "dayjs";

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
      const schedules = await plantService.getSchedulesByUserId({ userId });
      const todaySchedules = schedules.filter((schedule) => {
      let isToday = dayjs(schedule.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
        // let isFalse = !schedule.isChecked;
        return isToday;
    });
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
      const schedules = await plantService.getSchedulesByUserId({ userId });
      const fulfillSchedules = schedules.filter((schedule) => {
        return schedule.isChecked;
      });
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
      const schedules = await plantService.getSchedulesByUserId({ userId });
      const pendingSchedules = schedules.filter((schedule) => {
        return dayjs().isBefore(
          dayjs(schedule.date).format("YYYY-MM-DD"),
          "day"
        );
      });
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

      const updatedSchedulePlant = await Plant.updateSchedule({
        plantId,
        scheduleId,
        isChecked,
      }).then((plant) => {
        const lastSchedule = plant.schedule[plant.schedule.length - 1];
        const copiedLastSchedule = new Date(lastSchedule.date.getTime());
        const termWater = plant.termWater;
        const nextSchedule = copiedLastSchedule.setDate(
          copiedLastSchedule.getDate() + termWater
        );
        if (lastSchedule.isChecked == true) {
          plant.schedule.push({ date: nextSchedule, isChecked: false });
        }
        return plant;
      });

      res.status(200).json(updatedSchedulePlant);
    } catch (error) {
      next(error);
    }
  }
);

export { scheduleRouter };
