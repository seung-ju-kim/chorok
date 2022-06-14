import { Schema, model } from "mongoose";

const GardenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    imageURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  }
)

const GardenModel = model("Garden", GardenSchema);
export {GardenModel};