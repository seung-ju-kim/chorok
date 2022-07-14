const Joi = require('joi');



const plantValidate = {
    createPlant : async(req,res,next) => {
    const createPlantJoi = Joi.object().keys({
        species: Joi.string().min(1).max(50).trim().required()
        .messages({ 
            "number.min": "식물 종류를 1자 이상 입력해주세요", 
            "string.empty": "식물 종류를 1자 이상 입력해주세요",
            "number.max": "식물 종류는 50자 이하 제한입니다"
        }),
        nickname: Joi.string().min(1).max(50).trim().required()
        .messages({ 
            "number.min": "애칭을 1자 이상 입력해주세요", 
            "string.empty": "애칭을 1자 이상 입력해주세요",
            "number.max": "애칭은 50자 이하 제한입니다"
        }),
        imageURL: Joi.string().required()
        .messages({ 
            "string.empty": "식물 이미지를 등록해주세요",
        }),
        description: Joi.string()
        .messages({ 
            "string.empty": "한줄 소개를 1자 이상 입력해주세요",
        }),
        lastWater: Joi.date().less('now').required()
        .messages({ 
            "date.base": "마지막으로 물 준 날을 날짜 형식에 맞게 입력해주세요",
            "date.less": "마지막으로 물 준 날을 오늘 이전 날짜로 입력해주세요"
        }),
        termWater: Joi.number().min(1).max(100).required()
        .messages({ 
            "number.min": "물주는 주기는 1일 이하로 입력할 수 없습니다.", 
            "number.empty": "물주는 주기를 입력해주세요.",
            "number.max": "물주는 주기는 100일 이상 입력할 수 없습니다."
        }),
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