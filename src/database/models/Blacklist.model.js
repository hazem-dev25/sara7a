import mongoose from "mongoose";


const balcklistSchima = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:"30m"
    }
})
export const BlackListModle = mongoose.model('tokenBlackList' , balcklistSchima)

