import { Router } from "express";
import { success } from "../../common/utils/reseponce/index.js";
import {sendMess} from './messages.service.js'
import { messageschima } from "./messages.validation.js";
import {validation} from '../../common/utils/reseponce/validation.js'
import { getMess } from "./messages.service.js";
import {auth} from '../../common/middleware/auth.js'
import { getALLM } from "./messages.service.js";
import { deleteM } from "./messages.service.js";
import {rec} from './messages.service.js'


export const MessageRouter = Router()


MessageRouter.post('/send_message/:id' , validation(messageschima) ,  async  (req ,res)=>{
    let messageData = await sendMess(req.body , req.params.id)
    success({res , data: messageData , message: "message sened success" , status: 200})
})



MessageRouter.get('/get_all_messages' , auth , async (req ,res)=>{
    let messageData = await getALLM(req.userid)
    success({res , data: messageData , message: "here is your messages" , status: 200})
})


MessageRouter.get('/get_message_id/:id' , async  (req ,res)=>{
    let messageData = await getMess(req.params.id)
    success({res , data: messageData , message: "here is your messages" , status: 200})
})


MessageRouter.delete('/delete_massege/:id', auth ,async (req ,res)=>{
    let messageData = await deleteM(req.params.id , req.userid)
    success({res , data: messageData , message: "message deleted succuss" , status: 200})
})




MessageRouter.post('/reactions/:id' , async (req ,res)=>{
    let reaction = await rec(req.params.id , req.body)
    success({res , data: reaction , message: "reactions" , status: 200})
})