import mongoose from "mongoose";
import dotenv from  'dotenv'
dotenv.config({path: '../../config/.env'})
import { host } from "../../config/index.js";

export const connectionDB = async ()=>{
    mongoose.connect(host).then(()=>{
        console.log('database connected succ')
    }).catch(()=>{
        console.log('failed to connect to database')
    })
}