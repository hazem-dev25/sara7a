import Joi from "joi"



export const signUpSchima = Joi.object({
            name: Joi.string().min(2).max(20).required() , 
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(15).required()
        })