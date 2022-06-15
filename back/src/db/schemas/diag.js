import { Schema, model } from "mongoose";

const DiagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    korean: {
      type: String,
      required: true,
    },
    symptom: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    }
  }
);

const DiagModel = model("Diag", DiagSchema);

export { DiagModel };
