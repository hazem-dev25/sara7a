import {Conflict, NotFound, unauthorized} from '../../common/utils/reseponce/index.js'
import {BlackListModle, findByIdAndDelete, findByIdAndUpdate, userModel} from '../../database/index.js'
import bcrypt from 'bcrypt'
import {findOne , insertOne , find } from '../../database/index.js'
import { decodedRefreshToken, generateToken } from '../../common/security/security.js'
import { jwtAdminKey, jwtUserKey } from '../../../config/env.service.js'
import jwt from 'jsonwebtoken'




export const signUp = async (data)=>{
    let {name , email , password , phone} = data
    
    let exist = await findOne({model: userModel , filter: {email}})

    if(exist){
        Conflict({message: "email is already exist" , status: 409})
    }

    let userData = await insertOne({model: userModel , data: {name , email , password , phone}})

    return userData

}


export const userLogin = async (data , host)=>{
   let {email , password} = data
    let userData = await findOne({model: userModel , filter: {email} , select: "+password"})
    if(userData){
     let {acssesToken , refreshToken} = generateToken(userData , host)           
     let isvalid = bcrypt.compare(userData.password , password)
     if(isvalid){
      return {
          userData , 
            acssesToken ,
            refreshToken    
      }
     }else{
        NotFound({message: "user is not found" , status: 404})
    }  
}}


export const getaLL =  async (userid)=>{  
    let users = await findOne({model: userModel , filter: {_id: userid} , select: "-password"})
    return users
}


export const updateById = async (data , userid)=>{
    let {name , email} = data
    let user =  await findByIdAndUpdate({model: userModel , id: userid , update: {name , email}})
    return user
}


export const deleteUser = async (id)=>{
    let deleteU = await findByIdAndDelete({model: userModel , id: userID.userid})
    return {
        deleteU
    }
}


export const decodedRefreshT = async (token)=>{
    let decode = decodedRefreshToken(token)
    let segnature = undefined
    switch (decode.aud) {
        case "admin":
            segnature = jwtAdminKey
            break;

        default:
            segnature = jwtUserKey
            break;
    }
    let verifay = jwt.sign({id: decode.id} , segnature ,{
        expiresIn: "30m" ,
        audience: decode.aud 
    })
    return verifay
}


export const logOut = async (token)=>{
    console.log(token)
    let tokenData = await insertOne({model: BlackListModle , data: {token}})
    return tokenData
}