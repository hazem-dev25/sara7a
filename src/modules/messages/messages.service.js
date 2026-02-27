import {find, findById, findByIdAndDelete, findOne, insertOne, userModel} from '../../database/index.js'
import { messageModel } from '../../database/models/massege.model.js'
import { BadRequest, NotFound} from '../../common/utils/reseponce/index.js'
import { model } from 'mongoose'



export const sendMess = async (data , userid)=>{
    let {message , image} = data
    console.log(userid)
    let existUser = await findById({model: userModel ,id: userid})
    if(!existUser){
      return NotFound({message: 'user not found'})
    }
    let Data = await insertOne({model: messageModel ,data: {message , image , receverID: userid}})
    if(Data){
        return Data
    } else{
        BadRequest({message: "message not send"})
    }
}



export const getALLM = async (userid)=>{
    let existUser = findById({model: userModel , id: userid})
    if(!existUser){
        NotFound({message: "user is not found"})
    }

    let messages = await find({model: messageModel , filter: {receverID: userid}})
    if(messages.length == 0){
        NotFound({message: 'this user dont have messages yet'})
    }else{
        return messages
    }
}


export const getMess = async (id)=>{
    let userData = await findOne({model: messageModel , filter: {_id: id} , options: {populate: 'receverID'}})
    if(userData){
        return userData
    }else{
        NotFound({message: "message not found"})
    }
}



export const deleteM = async (messageID , userID)=>{
    let deleteMassege = await findByIdAndDelete({model: messageModel ,  id: {messageID , receverID: userID}})
    if(deleteMassege){
        return deleteMassege
    }else {
        NotFound({message: 'user is not found'})
    }
}


export const rec = async (id , data)=>{
    let {type} = data
   const allowed = ['love', 'funny', 'angry', 'fire']
   if(!allowed.includes(type)){
      return BadRequest({ message: 'invalid reaction' })
   }
   const message = await messageModel.findByIdAndUpdate(id,{ $inc: { [`reactions.${type}`]: 1 } },{ new: true })
   return message
}
