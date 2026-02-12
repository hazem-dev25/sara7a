import {Conflict, NotFound, unauthorized} from '../../common/utils/reseponce/index.js'
import {userModel} from '../../database/index.js'
import bcrypt from 'bcrypt'
import {findOne , insertOne , find } from '../../database/index.js'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../../../config/index.js'



export const signUp = async (data)=>{
    let {name , email , password , phone} = data
    
    let exist = await findOne({model: userModel , filter: {email}})

    if(exist){
        Conflict({message: "email is already exist" , status: 409})
    }

    let userData = await insertOne({model: userModel , data: {name , email , password , phone}})

    return userData

}


export const loginUser = async (data)=>{
    let { email  , password } = data 

    let user = await userModel.findOne({email}).select('+password')

    if(!user){
        throw new Error('email or password is not exist')
    }

    let passV = await bcrypt.compare(password , user.password)

    if(passV){
        const token = jwt.sign({userid: user._id} ,jwtKey)
    return {
        user , 
        token}
    }else{
        NotFound({message: "email or password is not exist"})
    }
}



export const getaLL =  async (headers)=>{
let {authorization} = headers
if(!authorization){
   return unauthorized({message: "you are not authorized to access this route"})
}
let Userid =  jwt.verify(authorization, jwtKey)

    let users = await find({model: userModel , filter: {_id: Userid.userid}})
    return users
}