import { Diag } from "../db";

const diagService = {
  getDisease: async (key) => {
    const result = await Diag.findByName(key);
    return result;
  }
};

export { diagService };
