import { Diag } from "../db";

const diagService = {
  getDisease: async (diseaseName) => {
    const result = await Diag.findByName({ name: diseaseName });
    return result;
  }
};

export { diagService };
