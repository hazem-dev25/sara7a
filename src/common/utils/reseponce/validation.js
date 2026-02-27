import {BadRequest} from './Error.response.js'



export const validation = (Schema)=>{
    return (req ,res, next)=>{
        let {value , error} = Schema.validate(req.body , {abortEarly: false})
        if(error){
            BadRequest({message: "validation error" , extra: error})
        }
        next()
    }
}