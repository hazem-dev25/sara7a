import jwt from "jsonwebtoken"
import { jwtAdminKey, jwtRefreshTokenAdmin, jwtRefreshTokenUser, jwtUserKey } from "../../../config/index.js"
import { unauthorized } from "../utils/reseponce/Error.response.js"


export const generateToken = (userData , host) =>{
  let segnature = undefined
  let refreshsegnature = undefined
        let audience = undefined
        switch (userData.role) {
            case "0":
                segnature = jwtAdminKey
                refreshsegnature = jwtRefreshTokenAdmin
                audience = "admin"
                break;
        
            case "1":
                segnature = jwtUserKey
                refreshsegnature = jwtRefreshTokenUser
                audience = "user"
                break;

                default:
                    unauthorized({message: "you are not auth"})
                   break;
                }
        let acssesToken = jwt.sign({id: userData._id} , segnature , { 
        issuer: host ,
        audience ,
        expiresIn: "30m"
    })
    let refreshToken = jwt.sign({id: userData._id} , refreshsegnature , { 
        issuer: host ,
        audience ,
        expiresIn: '1y'
    })
      return {acssesToken , refreshToken}
}



export const decodedToken =  (decode , token)=>{
   let segnature = undefined
   switch (decode.aud) {
    case"admin":
        segnature = jwtAdminKey
        break;
    case "user":
        segnature = jwtUserKey
        break;
    default:
       return unauthorized({message: "you are not auth"})
   }
   let verify = jwt.verify(token , segnature)
   return verify
}



export const decodedRefreshToken =  (token)=>{
    let decode = jwt.decode(token)
   let segnatureRefresh= undefined
   switch (decode.aud) {
    case"admin":
        segnatureRefresh = jwtRefreshTokenAdmin
        break;
    case "user":
        segnatureRefresh = jwtRefreshTokenUser
        break;
    default:
       return unauthorized({message: "you are not auth"})
   }
   let refreshVerify = jwt.verify(token , segnatureRefresh)
   return refreshVerify
}








