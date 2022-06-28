const Joi = require('joi');

const diaryValidate = {
    createDiary : async(req,res,next) => {
    const createDiaryJoi = Joi.object().keys({
        plantId: Joi.string().required().trim(),
        content: Joi.string().required().min(1).max(2000).trim(),
        imageURL: Joi.string().required()
    })
    try {
        await createDiaryJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

  updateDiary :  async(req, res, next) => {
    const updateDiaryJoi = Joi.object().keys({
        content: Joi.string().min(1).max(2000).trim(),
        imageURL: Joi.string()
    })
    try {
        await updateDiaryJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

}

export { diaryValidate };