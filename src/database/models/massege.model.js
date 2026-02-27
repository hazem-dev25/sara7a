import mongoos, { Types } from 'mongoose'


const messageSchema = new mongoos.Schema({
    message: {
        type: String, 
        min: 5 ,
        max: 150 , 
        required: true
    } ,
    receverID: {
        type:  Types.ObjectId ,
        ref: "user" ,
        required: true
    } ,
    data: {
        type: Date ,
        default: Date.now
    } ,
    image: {
        type: String
    }, 
    reactions: {
   love: { type: Number, default: 0 },
   funny: { type: Number, default: 0 },
   angry: { type: Number, default: 0 },
   fire: { type: Number, default: 0 }
}
} , {timestamps: true})




export const messageModel = mongoos.model('messages' , messageSchema)