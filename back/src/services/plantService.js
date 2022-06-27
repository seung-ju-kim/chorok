import {Plant} from "../db";

class plantService {
  /**
   * 나의 식물 생성
   */
  static async addPlant({userId, species, nickname, imageURL, description, lastWater, termWater}){
    
    const newPlant = {userId, species, nickname, imageURL, description, lastWater, termWater};
    const createdNewPlant =  await Plant.createPlant(newPlant);

    return createdNewPlant;
  }

  /**
   * 나의 식물 상세 조회
   */
  static async getPlantById(plantId){
    const plant = await Plant.findPlantById(plantId);
    return plant;
  }

  /**
   * 나의 식물 리스트 조회(페이징)
   */
  static async getPlantsByUserId({userId, page, perPage}){
    const plants = await Plant.findPlantsByUserId({userId, page, perPage});
    return plants;
  }

  /**
   * 페이징 처리한 식물 리스트의 마지막 페이지 번호 구하기
   */
  static async getLastPage({userId, perPage}) {
    const lastPage = await Plant.findLastPage({userId, perPage})
    return lastPage;
  }
  

  /**
   * 나의 식물 정보 수정
   */
  static async setPlant({plantId, toUpdate}){
    let plant = await Plant.findPlantById(plantId)

    if(!plant){
      const error = new Error("수정할 식물이 없습니다.");
      error.status = 404;
      throw error;
    }
    
    const myKeys = Object.keys(toUpdate);

    for (let i = 0 ; i<myKeys.length; i++){
      if (toUpdate[myKeys[i]] !== null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        plant = await Plant.update({plantId, fieldToUpdate, newValue});
      }
    }
    return plant;
  }

  /**
   * 나의 식물 삭제
   */
   static async deletePlant(plantId) {
    const isDataDeleted = await Plant.deletePlantById(plantId);
    if (isDataDeleted === false) {
      const error = new Error("삭제할 게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
  
  /**
   * 내 식물의 스케줄을 찾아서 식물정보를 포함해 리턴
   */
  static async getSchedulesByUserId({userId}) {

    const plants =await Plant.findPlantsByUserId2({userId});
    const schedules = [];
    plants.map((plant)=>{
      plant.schedule.map((obj)=>{
        obj["nickname"]=plant.nickname;
        obj["userId"]=plant.userId;
        obj["species"]=plant.species;
        obj["plantId"]=plant._id;
        schedules.push(obj);
      })
      //scheduleObj["nickname"] = plant.nickname;
      //schedules.push(scheduleObj);
    })
    const scheduleSortByDate = schedules.sort(function(a, b){
      return a.date - b.date
    })
    return scheduleSortByDate;
  };



  /**
   * case 1 마지막 스케줄을 완료하면 다음 스케줄이 발생하도록 하는 메소드
   * => 스케줄 리스트의 마지막 객체 isChecked 필드를 확인하고 true면 다음 스케줄 생성, false면 다음 스케줄 생성X 대신 재촉하는 메세지 리턴
   * when? 마지막 스케줄을 체크하면 다음 스케줄이 발생하도록 해당 메소드 실행
   * where? router단 콜백함수로 연결..?
   */
  static async pushWaterSchedule(plant) {
    
    const lastSchedule = plant.schedule.at(-1).date;
    const copiedLastSchedule = new Date(lastSchedule.getTime());
    const termWater = plant.termWater;

    const nextSchedule = copiedLastSchedule.setDate(copiedLastSchedule.getDate()+termWater);

    if (lastSchedule.isChecked) {
      plant.schedule.push({date: nextSchedule, isChecked:false})
    } 

    return plant;
  }
}

export {plantService};