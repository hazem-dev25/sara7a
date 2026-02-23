import { BadRequest } from "./Error.response.js"




export const validation = (schima)=>{
    return (req ,res ,next)=>{
        let {error , value} = schima.validate(req.body , {abortEarly: false})
                if(error){
                    throw BadRequest({message: "error validation",extra: error })
                }
        next()
    }
}