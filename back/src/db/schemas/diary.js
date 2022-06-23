import {Schema, model} from "mongoose";

const DiarySchema = new Schema(
  {
    userId:{
      type: String,
      index: true,
    },
    plantId:{
      type: String,
      index: true,
    },
    imageURL:{
      type: String,
    },
    content:{
      type: String,
    },
    date:{
      type:Date,
    },
    status:{
      type: String
    },
  },
  {
    timestamps: true,
  },
)

const DiaryModel = model("Diary", DiarySchema);

export {DiaryModel};