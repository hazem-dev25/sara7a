import mongoose from "mongoose";
import cryptojs from 'crypto-js' 
import { key} from "../../../config/index.js";
import bcrypt from 'bcrypt'
import { Gender, provider, userRole } from "../../common/enums/index.js";


const userschema  = mongoose.Schema({
    name:{
        type: String , 
        required: true , 
        trim: true
    }
   ,
    email: {
        type: String , 
        required: true ,
        unique: true , 
        trim: true,
        lowercase: true  , 
        index: true
    }, 
    password: {
        type: String , 
        required: true ,
        set: (value)=>{
            return bcrypt.hashSync(value , 10)
        } ,
        select: false
    } , 
    phone: {
        type: String ,
   set: (phone)=>{
              if (!phone) return phone;
          return  cryptojs.AES.encrypt(phone , key).toString()
        } , 
        get: (decryptPhone)=>{
              if (!decryptPhone) return decryptPhone;
            const orginalPhone = cryptojs.AES.decrypt(decryptPhone ,key);
            return orginalPhone.toString(cryptojs.enc.Utf8)
        }     
} , role: {
        type: String , 
        enum: ['admin' , 'user'] , 
        default: 'user' , 
        
    } , 
    gender:{
        type: String ,
        enum: Object.values(Gender) ,
        default: Gender.male
    } ,
    provider: {
        type: String , 
        enum: Object.values(provider) , 
        default: provider.system
    } , 
    role: {
        type: String , 
        enum: Object.values(userRole) , 
        default: userRole.user ,
    } , 
    profileViews: {
        type: Number ,
        default: 0
    } , 
    profileName: {
        type: String ,
        required: true ,
        unique: true
    } , 
    image: {
        type: String ,
        optional: true
    } ,
    isvarify: {
        type: Boolean ,
        default: false
    } 
} , { toJSON: {getters: true }}) 



export const userModel  = mongoose.model('user' , userschema)
