import Joi from "joi";



export const messageschima = Joi.object({
    message: Joi.string().min(10).max(150).required() , 
    image: Joi.string().optional()
}) 