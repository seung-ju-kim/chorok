import { DiaryModel } from "../schemas/diary";

const Diary = {
  createDiary: async (Diary) => {
    const newDiary = await DiaryModel.create(Diary);
    return newDiary;
  },
  findDiaryById: async (diaryId) => {
    const diary = await DiaryModel.findOne({ _id: diaryId });
    return diary;
  },
  findDiariesByPlantId: async (plantId) => {
    const diaries = await DiaryModel.find({ plantId }).sort({createdAt: -1});
    return diaries;
  },

  async update({ diaryId, fieldToUpdate, newValue }) {
    const filter = { _id: diaryId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedPlant = await DiaryModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPlant;
  },

  deleteDiaryById: async (diaryId) => {
    const deleteResult = await DiaryModel.deleteOne({ _id: diaryId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  },
};

export { Diary };
