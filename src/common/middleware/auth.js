import jwt from "jsonwebtoken"
import { decodedToken } from "../security/security.js"
import { BlackListModle } from "../../database/index.js"
import { unauthorized } from "../utils/reseponce/Error.response.js"

export const auth = async (req , res , next)=>{
 let {authorization} = req.headers
 let [flag , token] = authorization.split(" ")
 const exist = await BlackListModle.findOne({token})
 if(exist){
   return unauthorized({message:"token expired"})
  }
  switch (flag) {
    case "Basic":
      let data = Buffer.from(token , 'base64').toString()
      let [email , password] = data.split(':')
      console.log(email , password)
      break;
    case "Bearer":
      let decode = jwt.decode(token)
      let verify = decodedToken(decode , token)
      req.userid = verify.id
      break;
  }
 
   next() 
}


