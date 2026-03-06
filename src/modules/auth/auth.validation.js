import Joi from "joi"



export const signUpSchima = Joi.object({
            name: Joi.string().min(2).max(20).required() , 
            email: Joi.string().email().required(),
            age: Joi.number().min(18).max(50).required().messages({
                "number.min": "the age must morethan 18",
                "number.max": "age must be lessthan 50"
            }) ,
            password: Joi.string().min(5).max(15).required(),
            users: Joi.array().items(Joi.string()).max(3).optional(),
            profileName: Joi.string().required() 
        }).options({ allowUnknown: true }); 



    export const loginSchima = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    })