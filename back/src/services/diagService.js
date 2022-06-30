import { Diag } from "../db";

const diagService = {
  getDisease: async (key) => {
    const result = await Diag.findByName(key);

    if (!result) {
      const error = new Error("다시 찍어주세요")
      throw error;
    }
    return result;


  }
};

export { diagService };
