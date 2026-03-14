import {BadRequest, Conflict, NotFound, unauthorized} from '../../common/utils/reseponce/index.js'
import { findByIdAndDelete, findByIdAndUpdate, userModel} from '../../database/index.js'
import bcrypt, { compare } from 'bcrypt'
import {findOne , insertOne } from '../../database/index.js'
import { decodedRefreshToken, generateToken } from '../../common/security/security.js'
import { host, jwtAdminKey, jwtUserKey } from '../../../config/env.service.js'
import jwt from 'jsonwebtoken'
import { set} from '../../database/redis/redis.service.js'
import {event } from '../../common/utils/email/email.event.js'




export const signUp = async (data , file)=>{
     let size = file.size 
        if(size > 1000000){
            throw BadRequest({message: 'file size is too large'})
        }
    if(!file){  
        BadRequest({message: "image is required!"})
    }
 
    let {name , email , password , profileName , age  } = data
    
    let exist = await findOne({model: userModel , filter: {email}})

    if(exist){
        Conflict({message: "email is already exist" , status: 409})
    }

    let userData = await insertOne({model: userModel , data: {name , email , password  , age,  profileName ,  image: file.path} ,})
   
    event.emit('sendEmail' , {email , userID: userData._id , name})

    return userData
}


export const verifyEmail = async (data, host)=>{
    console.log(host)
    let {email ,code } = data
    let user = await findOne({model: userModel , filter: {email}})

    if(!user){
        NotFound({message: "user not found"})
    }

  event.emit('varifyemail' , {code , email , userID: user._id , user, host})


    return user
}

export const loginU = async (data , host)=>{
    let {email , password } = data
    let user = await findOne({model: userModel , filter: {email} , select: '+password'})
    if(!user){
        NotFound({message: "user not found"})
    }

    let passV = await compare(password  , user.password)
    if(!passV){
        BadRequest({message: "email or password is wrong!"})
    }

    let {acssesToken , refreshToken} = generateToken(user , host)

    return {
        user ,
        acssesToken ,
        refreshToken
    }
}


export const forgetPassword = async (data ,id)=>{
    let {email} = data

    let user = await findOne({model: userModel , filter: {email}})

    if(!user){
        NotFound({message: "user not found"})
    }

    event.emit('forgetPassword' , {email , userID: id , user})

    return user
}


export const resetPassword = async (data , host , id)=>{
    let {email , password , code} = data

    let user = await findOne({model: userModel , filter: {email}})

    if(!user){
        BadRequest({message: "user is not found"})
    }

    event.emit('resetPassword' , {code , password , userID: id , email , user , host})

    return user
}


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
    console.log(decode.aud)
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


export const logout = async (req)=>{
   let revokeKey = `revokeKey::${req.userid}::${req.token}`
   await set({
        key: revokeKey ,
        value: 1 , 
        ttl: req.decode.iat + 30 * 60
    })
    return 
}



export const profileV = async(id)=>{
    let userviews =  await userModel.findByIdAndUpdate(id, {  $inc: { profileViews: 1 } })
       if(userviews){
        return userviews
    }else{
        NotFound({message: 'user is not found'})
}
    const user = await findById({ model: userModel, id })
    return user   
}