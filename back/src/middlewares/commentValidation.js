const Joi = require('joi');

const commentValidate = {
    createComment : async(req,res,next) => {
    const createCommentJoi = Joi.object().keys({
        postId: Joi.string().required().trim(),
        content: Joi.string().required().min(1).max(500).trim(),
    })
    try {
        await createCommentJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

  updateComment :  async(req, res, next) => {
    const updateCommentJoi = Joi.object().keys({
        content: Joi.string().min(1).max(500).trim(),
    })
    try {
        await updateCommentJoi.validateAsync(req.body);
        next();
    } catch(error) {
        return res.status(400).send(error.message);
    }
  },

}

export { commentValidate };