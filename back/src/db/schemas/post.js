import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      index: true,
    },
    user_id:{
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    view: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const PostModel = model("Post", PostSchema);
export { PostModel };