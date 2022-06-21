import { DiaryModel } from "../schemas/diary";

class Diary{
  createDiary = async(Diary) => {
    const newDiary = await DiaryModel.create(Diary);
    return newDiary;
  }
  findDiaryById = async(diaryId) => {
    const diary = await DiaryModel.findOne({_id: diaryId});
    return diary;
  }
  findDiariesByPlantId = async(plantId) => {
    const diaries = await DiaryModel.find(plantId);
    return diaries;
  }
  
  static update = async({diaryId, fieldToUpdate, newValue}) => {
    const filter = {_id: diaryId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedPlant = await DiaryModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPlant;
  }

  deleteDiaryById = async(diaryId) => {
    await DiaryModel.deleteOne({_id : diaryId}, (result)=>{
      return result.deletedCount === 1;
    });
  }
}

export {Diary};