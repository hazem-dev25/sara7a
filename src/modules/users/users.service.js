import { NotFound } from '../../common/utils/reseponce/index.js '
import { userModel } from '../../database/models/users.model.js'
import { findById, findByIdAndUpdate, findOne } from '../../database/database.service.js'
import { BadRequest } from '../../common/utils/reseponce/Error.response.js'




export const userProfile = async (id)=>{
    let userData = await findOne({model: userModel , filter: {_id: id} , select: ("name email password")})
    if(userData){
        return userData
    }else{
        throw  NotFound({message: 'user not found'})
    }
}


export const getUrl = async (id)=>{
    let userData = await findOne({model: userModel , filter: {_id: id} , select: ("name email profileName")})
    if(userData){
        let url = `http://localhost:3000/${userData.profileName}`
        return url
    }else{
        throw  NotFound({message: 'user not found'})
    }
}


export const getProfile = async (data)=>{
    let profileName = data.url.split('/')[3]
    let userData = await findOne({model: userModel , filter: {profileName: profileName} , select: ("-password")})
    if(userData){
        return userData
    }else{
        throw  NotFound({message: 'user not found'})
    }
}



export const updateProfile = async (data , id , file)=>{
    let {name , email} = data
    let user = await findById({model: userModel , id: id})
    if(!user){
        NotFound({message: 'user is not exist'})
    }
    if (user.role == '1') {
        let updateuser = await findByIdAndUpdate({model: userModel  , id: id , update: {name , email , image: file.path}})
        return updateuser
    }else{
        BadRequest({message: 'you are not the user'})
    }
}


