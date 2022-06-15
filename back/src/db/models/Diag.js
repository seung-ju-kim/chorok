import { DiagModel } from "../schemas/diag";

const Diag = {
  findByName: async ({ name }) => {
    const result = await DiagModel.findOne({ name });
    return result;
  }
};

export { Diag };
