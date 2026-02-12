import { Router } from "express";
import { signUp } from "./user.service.js";
import { loginUser } from "./user.service.js";
import { success } from "../../common/utils/reseponce/index.js";
import { getaLL } from "./user.service.js";

export const router = Router()


router.post('/signup' , async (req ,res)=>{
    let userData = await signUp(req.body)
    if(userData){
        success({res, data: userData, message: "user added succ", status: 201})
        return
    }else{
        res.json({message: "failed to add user"})
        return
    }
})


router.post('/login' , async (req , res)=>{
    let userData = await loginUser(req.body)
    if(userData){
        success({res , data: userData, message: "login succ", status: 200})
        return
    }else{
        res.json({message: "failed to login"})
    }
})



router.get('/get_user_by_id' , async (req , res)=>{
    let users = await getaLL(req.headers)
    success({res , data: users, message: "get all users succ", status: 200})
})