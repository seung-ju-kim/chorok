import { Schema, model } from "mongoose";

const ScheduleSchema = new Schema(
  {
    date: {type: Date},
    isChecked: {type: Boolean, default: false}
  }
);

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

const GardenModel = model("Garden", GardenSchema);

export {GardenModel};