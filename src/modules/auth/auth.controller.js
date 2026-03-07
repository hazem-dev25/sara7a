import { Router } from "express";
import { signUp } from "./auth.service.js";
import { BadRequest, success } from "../../common/utils/reseponce/index.js";
import { getaLL } from "./auth.service.js";
import { updateById } from "./auth.service.js";
import { deleteUser } from "./auth.service.js";
import { loginU } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { decodedRefreshT } from "./auth.service.js";
import { logOut } from "./auth.service.js";
import { validation } from "../../common/utils/reseponce/validation.js";
import { loginSchima, signUpSchima } from "./auth.validation.js";
import { profileV } from "./auth.service.js";
import { multerSend } from "../../common/middleware/multer.js";



export const router = Router()




router.post('/signup' ,multerSend({custompath: 'profile/signup'}).single("image") , validation(signUpSchima), async (req ,res)=>{
    let userData = await signUp(req.body , req.file)
    if(userData){
        success({res, message: "user added succ", status: 201 , data: userData})
        return
    }else{
        res.json({message: "failed to add user"})
        return
    }
})


router.post('/login' , validation(loginSchima) , async(req ,res)=>{
    let userData = await loginU(req.body , `${req.protocol}${req.host}`)
    success({res, data: userData , message: 'user login success' , status: 200})
})


router.get('/get_user_by_id'  ,auth ,  async (req , res)=>{
    let users = await getaLL(req.userid)
    success({res , data: users, message: "get all users succ", status: 200})
})


router.patch('/update_user_by_id/:id' ,auth ,async (req , res)=>{
    let users = await updateById(req.body , req.params)
    success({res , data: users , message: 'user updated success' , status: 201})
})


router.delete('/delete_user_by_id' , auth , async (req ,res)=>{
    let userData = await deleteUser(req.params , req.userid)
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


router.post('/profile/:id', auth, async (req, res) => {
    let userData = await profileV(req.params.id)
   success({ res, data: userData })
})


// test multer

router.post('/test'  , multerSend({custompath: 'posts/profile/local'}).single('image') , (req ,res)=>{
    req.file.filepath = `${req.file.destination}/${req.file.filename}`
    let fileSize = req.file.size
    if(fileSize > 100000){
        res.json({message: "file is too large"})
        return
    }
    res.json({
        message: "done" ,
        uplode: req.file , 
        body: req.body
    })
})

router.post('/covers_profile' , multerSend({custompath: 'posts/profile/covers'}).array('images' , 4) , (req ,res)=>{
    let files = req.files
    files.map(file=>{
        file.filepath = `${file.destination}/${file.filename}`
    })
    res.json({
        message: "done" ,
        uplode: req.files , 
        body: req.body
    })
})



router.post('/fileds' , multerSend({custompath: 'user/profile/covers'}).fields([
   { name: 'profile' , maxCount: 1} ,
   { name: 'cover' , maxCount: 1 },
    {name: 'files' , maxCount: 1}
]) , (req ,res)=>{
    res.json({
        message: "done" ,
        uplode: req.files , 
        body: req.body
    })
})

