import express from 'express'
import { connectionDB } from './database/index.js'
import { router } from './modules/auth/auth.controller.js'
import {MessageRouter} from '../src/modules/messages/message.controller.js'
import { port } from '../config/index.js'
import { globalErrorHandler } from './common/utils/reseponce/index.js'
import {userRouter} from './modules/users/users.controller.js'
import { connectionRedis, del, get } from './database/redis/index.js'
import { set } from './database/redis/index.js'


export const bootstrab = async ()=>{
    const app = express()
    
    app.use(express.json())

    app.use(router)

    app.use(MessageRouter)

    app.use(globalErrorHandler)

    app.use(userRouter)

    await connectionRedis()

    app.use('/uploads', express.static('uploads'))

    app.use('{$dummy}' , (req , res)=>{
        res.json({message: "invalid route"})
    })

    await connectionDB()

    app.listen(port , ()=>{
        console.log('server is running succ')
    })

    
}