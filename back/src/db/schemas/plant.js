import { Schema, model } from "mongoose";


const ScheduleSchema = new Schema(
  {
    date: {type: Date},
    isChecked: {type: Boolean, default: false}
  }
);

const PlantSchema = new Schema(
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
    },
    imageURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    lastWater: {
      type: Date,
      default: Date.now,
    },
    termWater: {
      type: Number,
    }, 
    schedule: [ScheduleSchema],
  },
  {
    timestamps: true,
  }
)

const PlantModel = model("Plant", PlantSchema);

export {PlantModel};