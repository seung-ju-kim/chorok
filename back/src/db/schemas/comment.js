import mongoose from "mongoose";
const {Schema, model} = mongoose;

const CommentSchema = new Schema(
  {
    postID : {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);
export {CommentModel};
