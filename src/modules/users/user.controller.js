import { Router } from "express";
import { signUp } from "./user.service.js";
import { BadRequest, success } from "../../common/utils/reseponce/index.js";
import { getaLL } from "./user.service.js";
import { updateById } from "./user.service.js";
import { deleteUser } from "./user.service.js";
import { userLogin } from "./user.service.js";
import { auth } from "../../common/middleware/auth.js";
import { decodedRefreshT } from "./user.service.js";
import { logOut } from "./user.service.js";
import { validation } from "../../common/utils/reseponce/validation.js";
import { signUpSchima } from "./user.validation.js";


export const router = Router()


router.post('/signup' ,  validation(signUpSchima), async (req ,res)=>{
    let userData = await signUp(req.body)
    if(userData){
        success({res, message: "user added succ", status: 201})
        return
    }else{
        res.json({message: "failed to add user"})
        return
    }
})


router.post('/login' , async (req, res)=>{
    let user = await userLogin(req.body  , `${req.protocol}//${req.host}`)
    if(user){
        success({res , data: user , message: "login success" , status: 200})
        return
    }else{
        res.json({message: "failed to login"})
        return
    }
})



router.get('/get_user_by_id'  ,auth ,  async (req , res)=>{
    let users = await getaLL(req.userid)
    success({res , data: users, message: "get all users succ", status: 200})
})


router.patch('/update_user_by_id'  ,async (req , res)=>{
    let users = await updateById(req.body ,req.userId)
    success({res , data: users , message: 'user updated success' , status: 201})
})


router.delete('/delete_user_by_id' , async (req ,res)=>{
    let userData = await deleteUser(req.headers)
    success({res , data: userData , message: "user deleted success" , status: 200})
})



router.get('/acsses_new_token' , async (req , res)=>{
    let {authorization} = req.headers
    let tokenData = await decodedRefreshT(authorization)
     success({res , data: tokenData , message: "new token generated" , status: 200})
})


router.post('/logout' , auth ,async (req, res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    let tokenData  = await logOut(token)
    console.log(tokenData)
    success({res , data: tokenData , massege: "login out success" , status: 200})
})