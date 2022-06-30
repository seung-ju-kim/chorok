import {Diary} from "../db";

const diaryService = {
  /**
   * 다이어리 생성
   */
  addDiary : async({userId, plantId, imageURL, content, date, status}) => {
    
    const newDiary = {userId, plantId, imageURL, content, date, status};
    const createdNewDiary =  await Diary.createDiary(newDiary);

    return createdNewDiary;
  },

  /**
   * 다이어리 상세 조회
   */
  getDiaryById : async(diaryId) => {
    const diary = await Diary.findDiaryById(diaryId);
    return diary;
  },

  /**
   * 다이어리 목록 조회
   */
  getDiariesByPlantId : async(plantId) => {
    const diaries = await Diary.findDiariesByPlantId(plantId);
    diaries.map((diary)=>{
      diary.createdAt.setHours(diary.createdAt.getHours()+9);
    })
    return diaries;
  },
  /**
   * 다이어리 수정
   */

  setDiary : async({diaryId, toUpdate}) => {
    let diary = await Diary.findDiaryById(diaryId);

    if(!diary){
      const error = new Error("수정할 다이어리를 찾을 수 없습니다.")
      error.status = 404;
      throw error;
    }

    const myKeys =Object.keys(toUpdate);

    for (let i = 0; i < myKeys.length; i++) {
        if (toUpdate[myKeys[i]]!==null) {
          const fieldToUpdate = myKeys[i];
          const newValue = toUpdate[myKeys[i]];
          diary = await Diary.update({ diaryId, fieldToUpdate, newValue });
        }
      }
    return diary;
  },
  
  /**
   * 다이어리 삭제
   */
  deleteDiary : async(diaryId) => {
    const isDeleted = await Diary.deleteDiaryById(diaryId);
    if(isDeleted === false) {
      const error = new Error("삭제할 다이어리를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
}

export {diaryService};