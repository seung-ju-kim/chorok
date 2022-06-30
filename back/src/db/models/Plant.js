import { PlantModel } from "../schemas/plant";
import dayjs from "dayjs";

class Plant{

  static async createPlant(Plant) {
    
    const newPlant = await PlantModel.create(Plant);
    //const lastWater = JSON.parse(JSON.stringify(newPlant.lastWater));
    const lastWater = await newPlant.lastWater;
    const copiedLastWater = new Date(lastWater.getTime());
    const termWater = await newPlant.termWater;

    //마지막 물 준 날짜로부터 다음 물 주는 스케줄 생성
    //단, 다음 스케줄이 오늘 날짜보다 이전이면 오늘 날짜부터 스케줄 생성
    const today = new Date();
    const nextSchedule = copiedLastWater.setDate(copiedLastWater.getDate()+termWater);

    if (today >= nextSchedule){
      //새로 생성한 plant 데이터에 다음 스케줄을 입력 
      await newPlant.schedule.push({date: today, isChecked:false})
      return newPlant.save();
    }
    
    await newPlant.schedule.push({date: nextSchedule, isChecked:false})
    await newPlant.save();

    return newPlant;
  }


  static async findPlantById(plantId) {
    const plant = await PlantModel.findOne({_id: plantId});
    return plant;
  }

  static async findLastPage({userId, perPage}) {
    const totalPlants = await PlantModel.countDocuments({userId}); //아니면 카테고리별
    const lastPage = Math.ceil(totalPlants / perPage);
    return lastPage;
  }


  static async findPlantsByUserId({userId, page, perPage}) {
    return await PlantModel
    .find({userId})
    .sort({createdAt: -1})
    .limit(perPage)
    .skip((page-1) * perPage)
    .lean();
  }

  static async findAllPlantsByUserId({userId}) {
    return await PlantModel
    .find({userId})
    .sort({date: -1})
    .lean();
  }


  static async update({plantId, fieldToUpdate, newValue}) {
    const filter = {_id: plantId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedPlant = await PlantModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPlant;
  }

  static async deletePlantById(plantId) {
    const deleteResult = await PlantModel.deleteOne({_id: plantId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  static async updateSchedule({plantId, scheduleId, isChecked }) {
    const today = new Date();
    
    const updatedSchedule = await PlantModel.findOne({
      _id: plantId
    }).then((plant) =>{
      if (dayjs().isBefore(dayjs(plant.schedule.id(scheduleId).date), "day")){
        const error = new Error("예정된 스케줄은 체크할 수 없습니다.");
        throw error;
      }
      plant.schedule.id(scheduleId).set({isChecked:isChecked});
      plant.save();
      return plant;
    });

    return updatedSchedule;
  }
}

export {Plant};