import { GardenModel } from "../schemas/garden";

class Garden{

  static async createGarden(Garden) {
    const newGarden = await GardenModel.create(Garden);
    return newGarden;
  }

  static async findGardenById(gardenId) {
    const garden = await GardenModel.findOne({_id: gardenId});
    return garden;
  }

  static async findGardensByUserId(userId) {
    const gardens = await GardenModel.find({userId})
    return gardens;
  }


  static async update({gardenId, fieldToUpdate, newValue}) {
    const filter = {_id: gardenId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedGarden = await GardenModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedGarden;
  }

  static async deleteGardenById(gardenId) {
    const deleteResult = await GardenModel.deleteOne({_id: gardenId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}