import jwt from "jsonwebtoken"
import { decodedToken } from "../security/security.js"
import { unauthorized } from "../utils/reseponce/Error.response.js"
import { get } from "../../database/redis/redis.service.js"

export const auth = async (req , res , next)=>{
 let {authorization} = req.headers
 if(!authorization){
  unauthorized({message: 'unauthorized token'})
 }
 let [flag , token] = authorization.split(" ")
  switch (flag) {
    case "Basic":
      let data = Buffer.from(token , 'base64').toString()
      let [email , password] = data.split(':')
      console.log(email , password)
      break;
    case "Bearer":
      let decode = jwt.decode(token)
      let verify = decodedToken(decode , token)
      let revoke =  await get(`revokeKey::${verify.id}::${token}`)
      if(revoke){
       throw new Error ('user is alredy logout')
      }
      req.userid = verify.id
      req.token = token
      req.decode = decode
      break;
  }
   next() 
}


