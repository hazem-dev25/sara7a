import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { success } from "../../common/utils/reseponce/index.js";
import {userProfile} from './users.service.js'
import { getUrl } from "./users.service.js";
import { getProfile } from "./users.service.js";
import { updateProfile } from "./users.service.js";
import { multerSend } from "../../common/middleware/multer.js";
import { deleteProfile } from "./users.service.js";

 export const userRouter = Router()

userRouter.get('/user_profile' , auth , async (req ,res)=>{
    let userData = await userProfile(req.userid)
    success({res , data: userData , message: 'get user profile success' , status: 200})
})


userRouter.get('/get_url' , auth, async (req ,res)=>{
    let data = await getUrl(req.userid)
    success({res , data: data , message: 'get user url success' , status: 200})
})


userRouter.get('/get_url_page' , async (req ,res)=>{
    let data = await getProfile(req.body)
    success({res , data: data , message: 'get user profile success' , status: 200})
})


userRouter.patch('/update_profile' ,multerSend({custompath: 'update/profile'}).single('image'),  auth , async (req ,res)=>{
    let data = await updateProfile(req.body , req.userid , req.file)
    success({res , data: data , message: 'update user profile success' , status: 200})
})


userRouter.delete('/delete_profile' , auth , async (req ,res)=>{
    let data = await deleteProfile(req.userid)
    success({res , data: data , message: 'delete user profile success' , status: 200})
})


