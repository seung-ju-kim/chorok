const Joi = require('joi');

const plantValidate = {
    createPlant : async(req,res,next) => {
    const createPlantJoi = Joi.object().keys({
        species: Joi.string().min(1).max(50).trim().required(),
        nickname: Joi.string().min(1).max(50).trim().required(),
        imageURL: Joi.string().required(), 
        description: Joi.string(), 
        lastWater: Joi.date().less('now').required(), 
        termWater: Joi.number().min(1).max(100).required()
    })
    try {
        await createPlantJoi.validateAsync(req.body);
        next();
    } catch(error) {

        return res.status(400).send(error.message);
    }
  },

  updatePlant :  async(req, res, next) => {
    const updatePlantJoi = Joi.object().keys({
        species: Joi.string().min(1).max(50).trim(),
        nickname: Joi.string().min(1).max(50).trim(),
        imageURL: Joi.string(),
        description: Joi.string(),  
        termWater: Joi.number().min(1).max(100)
    })
    try {
        await updatePlantJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

}

export { plantValidate };