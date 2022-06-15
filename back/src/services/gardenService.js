import {Garden} from "../db";

class gardenService {
  /**
   * 나의 식물 생성
   */
  static async addGarden({userId, species, nickname, imageURL, lastWater, termWater}){
    
    const newGarden = {userId, species, nickname, imageURL, lastWater, termWater};
    const createdNewGarden =  await Garden.createGarden(newGarden);

    return createdNewGarden
  }

  /**
   * 나의 식물 상세 조회
   */
  static async getGardenById(gardenId){
    const garden = await Garden.findGardenById(gardenId);
    return garden;
  }

  /**
   * 나의 식물 리스트 조회
   */
  static async getGardensByUserId(userId){
    const gardens = await Garden.findGardensByUserId(userId);
    return gardens;
  }

  /**
   * 나의 식물 정보 수정
   */
  static async setGarden({gardenId, toUpdate}){
    let garden = await Garden.findGardenById(gardenId)

    if(!garden){
      const error = new Error("수정할 식물이 없습니다.");
      error.status = 404;
      throw error;
    }
    
    const myKeys = Object.keys(toUpdate);

    for (let i = 0 ; i<myKeys.length; i++){
      if (toUpdate[myKeys[i]] !== null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        garden = await Garden.update({gardenId, fieldToUpdate, newValue});
      }
    }
  }

  /**
   * 나의 식물 삭제
   */
   static async deleteGarden(gardenId) {
    const isDataDeleted = await Garden.deleteGardenById(gardenId);
    if (isDataDeleted === false) {
      const error = new Error("삭제할 게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
}

export {gardenService};