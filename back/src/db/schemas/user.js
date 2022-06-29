import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas: 
 *     User: 
 *       type: obejct
 *       required:
 *         - id
 *         - email
 *         - name
 *         - password
 *       properties:
 *         id: 
 *           type: string
 *         email: 
 *           type: string
 *         name: 
 *           type: string
 *         password: 
 *           type: string
 */

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index : true,
      unique : true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
