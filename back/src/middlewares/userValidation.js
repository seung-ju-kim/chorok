const Joi = require('joi');

const userValidate = {
  registerUser : async(req,res,next) => {
    const registerUserJoi = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required().min(1).max(20).trim(),
        password: Joi.string().required().trim(),
    })
    try {
        await registerUserJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

  loginUser : async(req,res,next) => {
    const loginUserJoi = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    try {
        await loginUserJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

  updateUser :  async(req, res, next) => {
    const updateUserJoi = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(1).max(20).trim(),
        description: Joi.string(),
    })
    try {
        await updateUserJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

}

export { userValidate };