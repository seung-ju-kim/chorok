import { Plant } from "../db";
import dayjs from "dayjs";

const scheduleService = {
  /**
   * 내 식물의 스케줄을 찾아서 식물정보를 포함해 리턴
   */
   getSchedulesByUserId: async ({ userId }) => {
    const plants = await Plant.findAllPlantsByUserId({ userId });
    const schedules = plants.flatMap((plant) => {
      return plant.schedule.map((schedule) => {
        return {
          ...schedule,
          nickname: plant.nickname,
          userId: plant.userId,
          species: plant.species,
          plantId: plant._id,
        };
      });
    });

    const scheduleSortByDate = schedules.sort(function (a, b) {
      return a.date - b.date;
    });
    return scheduleSortByDate;
  },

  /**
   * 오늘 날짜의 모든 스케줄 리턴
   */
  getTodaySchedules: async ({ userId }) => {
    const schedules = await scheduleService.getSchedulesByUserId({ userId });
    const todaySchedules = schedules.filter((schedule) => {
      let isToday =
        dayjs(schedule.date).format("YYYY-MM-DD") ===
        dayjs().format("YYYY-MM-DD");
      return isToday;
    });
    return todaySchedules;
  },
  /**
   * 완료한 스케줄 리턴
   */
  getFulfillSchedules: async ({ userId }) => {
    const schedules = await scheduleService.getSchedulesByUserId({ userId });
    const fulfillSchedules = schedules.filter((schedule) => {
      return schedule.isChecked;
    });
    return fulfillSchedules;
  },
  
  /**
   * 예정된 스케줄 리턴
   */
  getPendingSchedules: async ({ userId }) => {
    const schedules = await scheduleService.getSchedulesByUserId({ userId });
    const pendingSchedules = schedules.filter((schedule) => {
      return dayjs().isBefore(dayjs(schedule.date).format("YYYY-MM-DD"), "day");
    });
    return pendingSchedules;
  },

  /**
   * 물주기 체크 및 스케줄 추가
   */
   checkAndUpdateSchedule: async({plantId, scheduleId, isChecked}) => {
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
    return updatedSchedulePlant;
  }


};

export { scheduleService };
