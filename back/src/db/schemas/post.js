import { Schema, model } from "mongoose";

const category = ["정보공유", "자유"];

const PostSchema = new Schema(
  {
    category: {
      type: String,
      enum: [...category],
      required: true,
      index: true,
    },
    userId:{
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
    imageURL: {
      type: String,
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