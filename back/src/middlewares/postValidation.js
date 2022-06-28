const Joi = require('joi');

const postValidate = {
    createPost : async(req,res,next) => {
    const createPostJoi = Joi.object().keys({
        category: Joi.string().required().valid("정보공유", "자유"), 
        title:Joi.string().required().min(1).max(100).trim(),
        content: Joi.string().required().min(1).max(2000).trim(),
        imageURL: Joi.string()
    })
    try {
        await createPostJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

  updatePost :  async(req, res, next) => {
    const updatePostJoi = Joi.object().keys({
        title:Joi.string().min(1).max(100).trim(),
        content: Joi.string().min(1).max(2000).trim(),
    })
    try {
        await updatePostJoi.validateAsync(req.body);
        next();
    } catch(error) {
        // throw new Error(error.message);
        // throw error.message;
        return res.status(400).send(error.message);
    }
  },

}

export { postValidate };