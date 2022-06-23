import { DiagModel } from "../schemas/diag";

const Diag = {
  findByName: async (key) => {
    const result = await DiagModel.findOne({ name : key}).lean();
    return result;
  }
};

export { Diag };
