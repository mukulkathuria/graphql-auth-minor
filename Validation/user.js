const Joi = require("@hapi/joi");

const login = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(3).required()
});

const register = Joi.object({
    username:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    role:Joi.string().required(),
    password:Joi.string().min(3).required()
});

module.exports ={
    loginvalid : login,
    registerValid: register
}