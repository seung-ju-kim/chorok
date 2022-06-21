import {Schema, model} from "mongoose";

const DiarySchema = new Schema(
  {
    plantId:{
      type: String,
      index: true,
    },
    content:{
      type: String,
    },
    date:{
      type:Date,
    },
    imageURL:{
      type: String,
    },
    status:{
      type: String
    },
  }
)

const DiaryModel = model("Diary", DiarySchema);

export {DiaryModel};