import { Router } from "express";
import { plantService } from "../services/plantService";
import { Plant } from "../db";
import { login_required } from "../middlewares/login_required";
import dayjs from "dayjs";



const plantRouter = Router();

/**
 * plant(plant) 생성
 */
plantRouter.post("/plants", login_required, async (req, res, next) => {
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
  async (req, res, next) => {
    try {
      const plantId = req.params.id;

      const species = req.body.species ?? null;
      const nickname = req.body.nickname ?? null;
      const imageURL = req.body.imageURL ?? null;
      const description = req.body.description ?? null;
      const lastWater = req.body.lastWater ?? null;
      const termWater = req.body.termWater ?? null;

      const toUpdate = {
        species,
        nickname,
        imageURL,
        description,
        lastWater,
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
      const plantId = req.params.id;
      const isDeleted = await plantService.deletePlant(plantId);

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});

/**
 *  스케줄 객체에 식물정보를 담아 오늘 날짜만 리턴
 */
plantRouter.get(
  "/schedules",
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const schedules = await plantService.getSchedulesByUserId({userId});
      schedules.filter((schedule)=>{
        let now = dayjs();
        return dayjs(schedule.date).format("YYYY-MM-DD").isSame(dayjs().format("YYYY-MM-DD"));
      })
      console.log(schedules);
      console.log(todaySchedules);
      res.status(200).json(todaySchedules);
  } catch (error) {
    next(error);
  }
  }
)

/**
 *  스케줄 객체에 식물정보를 담아 이미 완료한 스케줄만 리턴
 */
 plantRouter.get(
  "/fulfillschedules",
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const schedules = await plantService.getSchedulesByUserId({userId});
      const fulfillSchedules = schedules.filter((schedule)=>{
        return schedule.isChecked;
      })
      res.status(200).json(fulfillSchedules);
  } catch (error) {
    next(error);
  }
  }
)


/**
 *  스케줄 객체에 식물정보를 담아 오늘 날짜 이후 스케줄 리턴
 */
 plantRouter.get(
  "/pendingschedules",
  login_required, 
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const schedules = await plantService.getSchedulesByUserId({userId});
      const pendingSchedules = schedules.filter((schedule)=>{
        return dayjs().format("YY-MM-DD").isAfter(dayjs(schedule.date, "YY-MM-DD"));
      })
      res.status(200).json(pendingSchedules);
  } catch (error) {
    next(error);
  }
  }
)

/**
 * plant 스케줄 이행 여부 체크 및 스케줄 추가
 */
plantRouter.post(
  "/plants/:id/:scheduleId",
  login_required,
  async (req, res, next) => {
    try {
      const plantId = req.params.id;
      const scheduleId = req.params.scheduleId;
      const isChecked = req.body.isChecked ?? false;

      const updatedSchedulePlant = 
      await Plant.updateSchedule({plantId, scheduleId, isChecked})
      .then((plant)=>{
        const lastSchedule = plant.schedule[plant.schedule.length - 1];
        const copiedLastSchedule = new Date(lastSchedule.date.getTime());
        const termWater = plant.termWater;
        const nextSchedule = copiedLastSchedule.setDate(copiedLastSchedule.getDate()+termWater);
        if (lastSchedule.isChecked == true) {
          plant.schedule.push({date: nextSchedule, isChecked:false})
        }
        return plant;
      })

      res.status(200).json(updatedSchedulePlant);

    } catch (error) {
      next(error);
    }
  }
);

export { plantRouter };
